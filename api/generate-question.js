import fs from 'fs'
import path from 'path'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  const { category, difficulty } = req.body

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

    const responseData = {
      stem: selected.stem,
      options: selected.options,
      correct_answer: selected.correct_answer,
      correct_answers: [selected.correct_answer],
      topic: selected.topic || selected.category,
      rationale: selected.rationale,
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
