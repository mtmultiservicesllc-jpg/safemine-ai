import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function Dashboard() {
  const router = useRouter()
  const [currentScreen, setCurrentScreen] = useState('dashboard')
  const [question, setQuestion] = useState(null)
  const [qLoading, setQLoading] = useState(false)
  const [answered, setAnswered] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [category, setCategory] = useState('Toutes')

  const [stats, setStats] = useState({
    total: 0,
    correct: 0,
    byCategory: {
      'Toutes': { total: 0, correct: 0 },
      'loto': { total: 0, correct: 0 },
      'engins': { total: 0, correct: 0 },
      'hauteur': { total: 0, correct: 0 },
      'confine': { total: 0, correct: 0 },
      'levage': { total: 0, correct: 0 },
      'tir': { total: 0, correct: 0 },
      'environnement': { total: 0, correct: 0 },
      'incendie': { total: 0, correct: 0 },
      'secours': { total: 0, correct: 0 }
    }
  })

  useEffect(() => {
    const saved = localStorage.getItem('safemine_stats')
    if (saved) {
      try { 
        const parsed = JSON.parse(saved)
        setStats(prev => ({ ...prev, ...parsed, byCategory: { ...prev.byCategory, ...(parsed.byCategory || {}) } }))
      } catch (e) {}
    }
  }, [])

  async function generateQuestion() {
    setQLoading(true)
    setQuestion(null)
    setAnswered(false)
    setSelectedAnswer(null)

    try {
      const res = await fetch('/api/generate-question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category })
      })
      const data = await res.json()
      setQuestion(data.data)
    } catch (e) {
      console.error(e)
    }
    setQLoading(false)
  }

  function handleAnswer(letter) {
    if (answered) return
    setAnswered(true)
    setSelectedAnswer(letter)

    const isCorrect = letter === question.correct_answer

    setStats(prev => {
      const catKey = category
      const currentCat = prev.byCategory[catKey] || { total: 0, correct: 0 }

      const newStats = {
        total: prev.total + 1,
        correct: prev.correct + (isCorrect ? 1 : 0),
        byCategory: {
          ...prev.byCategory,
          [catKey]: {
            total: currentCat.total + 1,
            correct: currentCat.correct + (isCorrect ? 1 : 0)
          }
        }
      }
      localStorage.setItem('safemine_stats', JSON.stringify(newStats))
      return newStats
    })
  }

  const cats = [
    { key:'Toutes', label:'🎯 Toutes les Familles de Risque (Aléatoire Global)' },
    { key:'Consignation', label:'⚡ Consignation & Énergie (LOTO)' },
    { key:'Engins', label:'🚜 Conduite d\'Engins Lourds & Pistes (100t)' },
    { key:'Hauteur', label:'🏗️ Travaux en Hauteur & Échafaudages' },
    { key:'Confinés', label:'☣️ Espaces Confinés & Gaz Toxiques (4-Gaz)' },
    { key:'Levage', label:'🏗️ Levage, Grutage & Charges Suspendues' },
    { key:'Tir', label:'💥 Tir de Mines, Explosifs (ANFO) & Misfires' },
    { key:'Environnement', label:'🌿 Environnement & Hydrocarbures (ISO 14001)' },
    { key:'Incendie', label:'🔥 Incendie & Arrêts Convoyeurs à Bande' },
    { key:'Secours', label:'🚑 Premiers Secours Miniers & Garrot Tourniquet' }
  ]

  const overallRate = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0

  return (
    <div style={{ display:'flex', height:'100vh', fontFamily:"'DM Sans',system-ui,sans-serif", background:'#090B0E', color:'#EAEFF5', overflow:'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;700&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-thumb { background: rgba(243,156,18,0.2); border-radius:2px; }
        select { outline: none; cursor: pointer; }
        button { cursor: pointer; transition: all 0.15s; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
      `}</style>

      {/* SIDEBAR */}
      <aside style={{ width:'270px', background:'#11161F', borderRight:'1px solid rgba(243,156,18,0.1)', padding:'24px 0', display:'flex', flexDirection:'column', flexShrink:0 }}>
        <div style={{ padding:'0 20px 24px', borderBottom:'1px solid rgba(243,156,18,0.1)', marginBottom:'16px' }}>
          <div style={{ fontSize:'20px', color:'#F1C40F', fontWeight:'700' }}>SAFEMINE<span style={{ color:'#FFFFFF' }}> AI</span></div>
          <div style={{ fontSize:'11px', color:'#718096', marginTop:'2px' }}>Supervision Sécurité Opérationnelle (Mines)</div>
        </div>

        <button onClick={() => setCurrentScreen('dashboard')}
          style={{ display:'flex', alignItems:'center', gap:'10px', padding:'12px 20px', fontSize:'14px',
            color: currentScreen === 'dashboard' ? '#F1C40F' : '#A0AEC0',
            background: currentScreen === 'dashboard' ? 'rgba(243,156,18,0.08)' : 'transparent',
            border:'none', borderLeft: currentScreen === 'dashboard' ? '3px solid #F39C12' : '3px solid transparent',
            textAlign:'left', width:'100%', fontWeight: currentScreen === 'dashboard' ? '600' : '400' }}>
          📊 Tableau de Bord HSE
        </button>

        <button onClick={() => setCurrentScreen('study')}
          style={{ display:'flex', alignItems:'center', gap:'10px', padding:'12px 20px', fontSize:'14px',
            color: currentScreen === 'study' ? '#F1C40F' : '#A0AEC0',
            background: currentScreen === 'study' ? 'rgba(243,156,18,0.08)' : 'transparent',
            border:'none', borderLeft: currentScreen === 'study' ? '3px solid #F39C12' : '3px solid transparent',
            textAlign:'left', width:'100%', fontWeight: currentScreen === 'study' ? '600' : '400' }}>
          🦺 Flash Sécurité Quotidien
        </button>

        <div style={{ marginTop:'auto', padding:'16px 20px', borderTop:'1px solid rgba(243,156,18,0.1)' }}>
          <div style={{ background:'rgba(243,156,18,0.08)', border:'1px solid rgba(243,156,18,0.2)', borderRadius:'10px', padding:'12px 14px', marginBottom:'12px' }}>
            <div style={{ fontSize:'11px', color:'#A0AEC0', marginBottom:'2px' }}>Chantier Actif</div>
            <div style={{ fontSize:'15px', fontWeight:'700', color:'#F1C40F' }}>Simandou (WCS / Rio Tinto)</div>
            <div style={{ fontSize:'11px', color:'#718096', marginTop:'4px' }}>Badge Opérateur Démo Pilote</div>
          </div>
          <button onClick={() => router.push('/')}
            style={{ width:'100%', background:'transparent', border:'1px solid rgba(243,156,18,0.2)', borderRadius:'6px', padding:'8px', fontSize:'12px', color:'#A0AEC0' }}>
            Quitter la session
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
        <header style={{ height:'64px', borderBottom:'1px solid rgba(243,156,18,0.1)', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 32px', flexShrink:0 }}>
          <div style={{ fontSize:'14px', color:'#A0AEC0' }}>
            Site minier : <span style={{ color:'#FFFFFF', fontWeight:'600' }}>Zone d'Extraction, Voie Ferrée & Terminal Portuaire</span>
          </div>
          <button onClick={() => setCurrentScreen('study')} style={{ background:'#F39C12', color:'#090B0E', border:'none', borderRadius:'8px', padding:'8px 16px', fontSize:'13px', fontWeight:'700' }}>
            + Lancer un Cas Pratique HSE
          </button>
        </header>

        {currentScreen === 'dashboard' && (
          <div style={{ flex:1, overflowY:'auto', padding:'32px' }}>
            <h1 style={{ fontSize:'24px', fontWeight:'700', color:'#FFFFFF', marginBottom:'8px' }}>Tableau de bord de conformité HSE</h1>
            <p style={{ color:'#A0AEC0', fontSize:'14px', marginBottom:'28px' }}>Mesure en direct du respect des règles vitales de sécurité sur site (25 cas industriels actifs).</p>

            {/* METRICS */}
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))', gap:'16px', marginBottom:'32px' }}>
              <div style={{ background:'#11161F', border:'1px solid rgba(243,156,18,0.12)', borderRadius:'12px', padding:'20px' }}>
                <div style={{ color:'#A0AEC0', fontSize:'12px', textTransform:'uppercase' }}>Cas Sécurité Traités</div>
                <div style={{ fontSize:'32px', fontWeight:'700', color:'#F1C40F', marginTop:'8px' }}>{stats.total}</div>
                <div style={{ fontSize:'11px', color:'#718096', marginTop:'4px' }}>{stats.correct} conformes sur {stats.total}</div>
              </div>
              <div style={{ background:'#11161F', border:'1px solid rgba(243,156,18,0.12)', borderRadius:'12px', padding:'20px' }}>
                <div style={{ color:'#A0AEC0', fontSize:'12px', textTransform:'uppercase' }}>Indice de Conformité</div>
                <div style={{ fontSize:'32px', fontWeight:'700', color: stats.total > 0 ? (overallRate >= 80 ? '#2ECC71' : '#E74C3C') : '#718096', marginTop:'8px' }}>
                  {stats.total > 0 ? `${overallRate}%` : '0%'}
                </div>
                <div style={{ fontSize:'11px', color:'#718096', marginTop:'4px' }}>Seuil critique minimum : 80%</div>
              </div>
              <div style={{ background:'#11161F', border:'1px solid rgba(243,156,18,0.12)', borderRadius:'12px', padding:'20px' }}>
                <div style={{ color:'#A0AEC0', fontSize:'12px', textTransform:'uppercase' }}>Risque d'Accident Estimé</div>
                <div style={{ fontSize:'24px', fontWeight:'700', color: stats.total > 0 ? (overallRate >= 80 ? '#2ECC71' : '#E74C3C') : '#718096', marginTop:'12px' }}>
                  {stats.total === 0 ? 'En attente' : (overallRate >= 80 ? 'MAÎTRISÉ (Faible)' : 'CRITIQUE (Élevé)')}
                </div>
                <div style={{ fontSize:'11px', color:'#718096', marginTop:'4px' }}>Normes OSHA 1910 / Rio Tinto</div>
              </div>
            </div>

            {/* SECTIONS */}
            <h2 style={{ fontSize:'18px', fontWeight:'700', color:'#FFFFFF', marginBottom:'16px' }}>Maîtrise par Famille de Risque</h2>
            <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
              {cats.slice(1).map(c => {
                const catStat = stats.byCategory[c.key] || { total: 0, correct: 0 }
                const catRate = catStat.total > 0 ? Math.round((catStat.correct / catStat.total) * 100) : 0
                return (
                  <div key={c.key} style={{ background:'#11161F', border:'1px solid rgba(243,156,18,0.08)', borderRadius:'10px', padding:'16px' }}>
                    <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'8px' }}>
                      <span style={{ fontSize:'14px', fontWeight:'500', color:'#FFFFFF' }}>{c.label}</span>
                      <span style={{ fontSize:'14px', color: catStat.total > 0 ? '#F1C40F' : '#718096', fontWeight:'600' }}>
                        {catStat.total > 0 ? `${catRate}% (${catStat.correct}/${catStat.total})` : 'Non évalué'}
                      </span>
                    </div>
                    <div style={{ width:'100%', height:'6px', background:'rgba(243,156,18,0.1)', borderRadius:'3px', overflow:'hidden' }}>
                      <div style={{ width:`${catRate}%`, height:'100%', background: catRate >= 80 ? '#2ECC71' : '#F39C12', borderRadius:'3px', transition:'width 0.4s ease' }}></div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {currentScreen === 'study' && (
          <div style={{ flex:1, overflowY:'auto', padding:'32px', maxWidth:'900px', margin:'0 auto', width:'100%' }}>
            {!question && !qLoading && (
              <div style={{ background:'#11161F', border:'1px solid rgba(243,156,18,0.15)', borderRadius:'16px', padding:'32px', textAlign:'center' }}>
                <h2 style={{ fontSize:'22px', fontWeight:'700', color:'#FFFFFF', marginBottom:'12px' }}>Simulation de Cas Concret sur Site</h2>
                <p style={{ color:'#A0AEC0', fontSize:'14px', marginBottom:'24px' }}>Sélectionnez la famille de risque à évaluer (ou choisissez Tout le site) :</p>

                <div style={{ display:'flex', gap:'16px', justifyContent:'center', marginBottom:'24px' }}>
                  <select value={category} onChange={e => setCategory(e.target.value)}
                    style={{ background:'#19212C', color:'#FFFFFF', border:'1px solid rgba(243,156,18,0.3)', padding:'12px 18px', borderRadius:'8px', fontSize:'14px', maxWidth:'450px', width:'100%' }}>
                    {cats.map(c => <option key={c.key} value={c.key}>{c.label}</option>)}
                  </select>
                </div>

                <button onClick={generateQuestion}
                  style={{ background:'#F39C12', color:'#090B0E', border:'none', borderRadius:'10px', padding:'14px 28px', fontSize:'15px', fontWeight:'700' }}>
                  Lancer le Cas de Sécurité ➔
                </button>
              </div>
            )}

            {qLoading && (
              <div style={{ textAlign:'center', padding:'60px 0' }}>
                <div style={{ width:'36px', height:'36px', border:'2px solid rgba(243,156,18,0.2)', borderTopColor:'#F1C40F', borderRadius:'50%', animation:'spin 0.8s linear infinite', margin:'0 auto 16px' }}></div>
                <p style={{ color:'#A0AEC0' }}>Chargement du scénario HSE critique...</p>
              </div>
            )}

            {question && (
              <div style={{ background:'#11161F', border:'1px solid rgba(243,156,18,0.2)', borderRadius:'16px', padding:'28px', animation:'fadeUp 0.3s ease' }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'16px', borderBottom:'1px solid rgba(243,156,18,0.1)', paddingBottom:'12px' }}>
                  <span style={{ fontSize:'12px', background:'rgba(243,156,18,0.1)', color:'#F1C40F', padding:'4px 10px', borderRadius:'20px', fontWeight:'600' }}>
                    {question.topic}
                  </span>
                  <span style={{ fontSize:'12px', color:'#718096' }}>Standard International HSE Simandou</span>
                </div>

                <p style={{ fontSize:'16px', lineHeight:'1.6', color:'#FFFFFF', marginBottom:'24px' }}>
                  {question.stem}
                </p>

                <div style={{ display:'flex', flexDirection:'column', gap:'12px', marginBottom:'24px' }}>
                  {Object.entries(question.options || {}).map(([letter, text]) => {
                    let borderCol = 'rgba(243,156,18,0.15)'
                    let bgCol = '#19212C'
                    let textCol = '#FFFFFF'

                    if (answered) {
                      if (letter === question.correct_answer) {
                        borderCol = '#2ECC71'
                        bgCol = 'rgba(46,204,113,0.15)'
                        textCol = '#2ECC71'
                      } else if (letter === selectedAnswer) {
                        borderCol = '#E74C3C'
                        bgCol = 'rgba(231,76,60,0.15)'
                        textCol = '#E74C3C'
                      }
                    }

                    return (
                      <button key={letter} onClick={() => handleAnswer(letter)} disabled={answered}
                        style={{ display:'flex', alignItems:'flex-start', gap:'12px', padding:'14px 16px', borderRadius:'8px', border:`1px solid ${borderCol}`, background: bgCol, textAlign:'left', width:'100%' }}>
                        <span style={{ fontWeight:'700', color: textCol, flexShrink:0 }}>{letter}.</span>
                        <span style={{ color: textCol, fontSize:'14px', lineHeight:'1.4' }}>{text}</span>
                      </button>
                    )
                  })}
                </div>

                {answered && (
                  <div style={{ background:'rgba(243,156,18,0.05)', border:'1px solid rgba(243,156,18,0.2)', borderRadius:'12px', padding:'20px', marginBottom:'24px' }}>
                    <div style={{ fontSize:'14px', fontWeight:'700', color: selectedAnswer === question.correct_answer ? '#2ECC71' : '#E74C3C', marginBottom:'8px' }}>
                      {selectedAnswer === question.correct_answer ? '✓ Réponse Conforme aux Normes Minières' : '✗ Risque Majeur d\'Incident Détecté'}
                    </div>
                    <p style={{ fontSize:'14px', color:'#EAEFF5', lineHeight:'1.5', marginBottom:'12px' }}>
                      {question.rationale?.correct}
                    </p>
                    {question.safety_tip && (
                      <div style={{ background:'#19212C', borderLeft:'3px solid #F1C40F', padding:'10px 14px', borderRadius:'4px', fontSize:'13px', color:'#F1C40F' }}>
                        🛡️ <strong>Règle d'or :</strong> {question.safety_tip}
                      </div>
                    )}
                  </div>
                )}

                <div style={{ display:'flex', justifyContent:'space-between' }}>
                  <button onClick={() => setQuestion(null)}
                    style={{ background:'transparent', border:'1px solid rgba(243,156,18,0.2)', color:'#A0AEC0', padding:'10px 18px', borderRadius:'8px', fontSize:'13px' }}>
                    Changer de Risque
                  </button>
                  {answered && (
                    <button onClick={generateQuestion}
                      style={{ background:'#F39C12', color:'#090B0E', border:'none', padding:'10px 20px', borderRadius:'8px', fontSize:'13px', fontWeight:'700' }}>
                      Cas Suivant ➔
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
