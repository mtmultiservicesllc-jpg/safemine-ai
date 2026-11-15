import fs from 'fs'
import path from 'path'

// Fonction pour mélanger aléatoirement un tableau (Fisher-Yates)
function shuffleArray(array) {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  const { category } = req.body

  try {
    const filePath = path.join(process.cwd(), 'data', 'questions-hse.json')
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'Banque HSE introuvable' })
    }

    const fileContent = fs.readFileSync(filePath, 'utf8')
    const questions = JSON.parse(fileContent)

    let filtered = questions
    if (category && category !== 'Toutes') {
      const match = questions.filter(q => q.category.toLowerCase().includes(category.toLowerCase()))
      if (match.length > 0) filtered = match
    }

    const randomIndex = Math.floor(Math.random() * filtered.length)
    const selected = filtered[randomIndex]

    // Mélange dynamique des options pour que la bonne réponse change de place à chaque tirage
    const letters = ['A', 'B', 'C', 'D']
    const originalKeys = Object.keys(selected.options) // ['A', 'B', 'C', 'D']
    const shuffledKeys = shuffleArray(originalKeys) // ex: ['C', 'A', 'D', 'B']

    const newOptions = {}
    const newRationale = { correct: selected.rationale.correct }
    let newCorrectAnswer = 'A'

    shuffledKeys.forEach((oldKey, idx) => {
      const newLetter = letters[idx]
      newOptions[newLetter] = selected.options[oldKey]
      newRationale[newLetter] = selected.rationale[oldKey]
      
      if (oldKey === selected.correct_answer) {
        newCorrectAnswer = newLetter
      }
    })

    const responseData = {
      stem: selected.stem,
      options: newOptions,
      correct_answer: newCorrectAnswer,
      correct_answers: [newCorrectAnswer],
      topic: selected.topic || selected.category,
      rationale: newRationale,
      safety_tip: selected.safety_tip || "Règle d'or : En cas de doute sur la sécurité, arrêtez immédiatement le travail (Droit de retrait)."
    }

    return res.status(200).json({
      success: true,
      data: responseData,
      type: 'multiple-choice'
    })
  } catch (error) {
    console.error('Erreur lecture HSE:', error)
    return res.status(500).json({ error: 'Erreur serveur', details: error.message })
  }
}
