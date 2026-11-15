import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()

  const handleStartDemo = () => {
    router.push('/dashboard')
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        body{font-family:'DM Sans',system-ui,sans-serif;background:#090B0E;color:#EAEFF5;min-height:100vh}
        @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        .btn-gold:hover{background:#F39C12!important;transform:translateY(-2px);box-shadow:0 8px 24px rgba(243,156,18,0.35)}
        .feat-card:hover{border-color:rgba(243,156,18,0.3)!important;transform:translateY(-2px)}
      `}</style>

      {/* NAV */}
      <nav style={{position:'fixed',top:0,left:0,right:0,zIndex:100,display:'flex',alignItems:'center',justifyContent:'space-between',padding:'16px 48px',background:'rgba(9,11,14,0.95)',backdropFilter:'blur(12px)',borderBottom:'1px solid rgba(243,156,18,0.12)'}}>
        <div style={{fontSize:'22px',fontWeight:'700',color:'#F1C40F'}}>
          SAFEMINE<span style={{color:'#FFFFFF'}}> AI</span>
        </div>
        <div style={{display:'flex',gap:'24px',alignItems:'center'}}>
          <span style={{fontSize:'12px',color:'#A0AEC0',background:'rgba(243,156,18,0.08)',padding:'6px 14px',borderRadius:'20px',border:'1px solid rgba(243,156,18,0.15)'}}>
            Standards HSE Miniers & BTP
          </span>
          <button onClick={handleStartDemo} className="btn-gold" style={{background:'#F39C12',color:'#090B0E',border:'none',padding:'10px 22px',borderRadius:'8px',fontSize:'14px',fontWeight:'700',cursor:'pointer',transition:'all .2s'}}>
            Accéder à la Démo HSE ➔
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section style={{minHeight:'90vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',textAlign:'center',padding:'140px 24px 80px',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',top:'-100px',left:'50%',transform:'translateX(-50%)',width:'800px',height:'800px',background:'radial-gradient(circle,rgba(243,156,18,0.1) 0%,transparent 70%)',pointerEvents:'none'}}></div>
        
        <div style={{display:'inline-flex',alignItems:'center',gap:'8px',background:'rgba(243,156,18,0.1)',border:'1px solid rgba(243,156,18,0.3)',borderRadius:'100px',padding:'6px 18px',fontSize:'13px',color:'#F1C40F',marginBottom:'28px',animation:'fadeUp .6s ease both'}}>
          ★ Première Solution Digitale d'Évaluation Quotidienne de la Sécurité Minière en Guinée
        </div>

        <h1 style={{fontSize:'clamp(36px, 6vw, 64px)',fontWeight:'700',lineHeight:'1.15',maxWidth:'950px',marginBottom:'24px',color:'#FFFFFF'}}>
          Zéro Accident sur Site Grâce à l'Entraînement HSE Assisté par IA
        </h1>

        <p style={{fontSize:'18px',lineHeight:'1.6',color:'#A0AEC0',maxWidth:'750px',marginBottom:'40px'}}>
          Formez et évaluez vos opérateurs, chauffeurs et sous-traitants en 3 minutes par jour sur smartphone. Conforme aux standards internationaux Rio Tinto, WCS, SMB, GAC et ISO 45001. Développé par MT MULTISERVICES LLC.
        </p>

        <div style={{display:'flex',gap:'16px',flexWrap:'wrap',justifyContent:'center'}}>
          <button onClick={handleStartDemo} className="btn-gold" style={{background:'#F39C12',color:'#090B0E',border:'none',padding:'16px 36px',borderRadius:'10px',fontSize:'16px',fontWeight:'700',cursor:'pointer',transition:'all .2s'}}>
            Tester la Simulation HSE Immédiatement ➔
          </button>
        </div>

        <div style={{marginTop:'48px',display:'flex',gap:'32px',color:'#718096',fontSize:'13px'}}>
          <span>✓ Consignation LOTO</span>
          <span>✓ Conduite d'engins 100t</span>
          <span>✓ Espaces confinés & Hauteur</span>
          <span>✓ Suivi en direct pour Directeurs HSE</span>
        </div>
      </section>

      {/* AVANTAGES */}
      <section style={{padding:'80px 24px',maxWidth:'1100px',margin:'0 auto'}}>
        <h2 style={{textAlign:'center',fontSize:'28px',fontWeight:'700',marginBottom:'48px',color:'#FFFFFF'}}>
          Pourquoi les Géants Miniers et Sous-Traitants Choisissent SAFEMINE AI
        </h2>

        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))',gap:'24px'}}>
          <div className="feat-card" style={{background:'#11161F',border:'1px solid rgba(243,156,18,0.1)',borderRadius:'16px',padding:'32px'}}>
            <div style={{fontSize:'28px',marginBottom:'16px'}}>🚧</div>
            <h3 style={{fontSize:'18px',fontWeight:'700',color:'#FFFFFF',marginBottom:'12px'}}>Quart d'Heure Sécurité Digital</h3>
            <p style={{color:'#A0AEC0',fontSize:'14px',lineHeight:'1.6'}}>Chaque matin avant le début de poste, l'ouvrier répond à 2 cas concrets sur son téléphone pour activer ses réflexes vitaux.</p>
          </div>

          <div className="feat-card" style={{background:'#11161F',border:'1px solid rgba(243,156,18,0.1)',borderRadius:'16px',padding:'32px'}}>
            <div style={{fontSize:'28px',marginBottom:'16px'}}>📊</div>
            <h3 style={{fontSize:'18px',fontWeight:'700',color:'#FFFFFF',marginBottom:'12px'}}>Traçabilité & Preuve d'Audit</h3>
            <p style={{color:'#A0AEC0',fontSize:'14px',lineHeight:'1.6'}}>Tableau de bord institutionnel permettant au Directeur HSE de prouver aux inspecteurs et assureurs que 100% des équipes sont évaluées.</p>
          </div>

          <div className="feat-card" style={{background:'#11161F',border:'1px solid rgba(243,156,18,0.1)',borderRadius:'16px',padding:'32px'}}>
            <div style={{fontSize:'28px',marginBottom:'16px'}}>⚡</div>
            <h3 style={{fontSize:'18px',fontWeight:'700',color:'#FFFFFF',marginBottom:'12px'}}>Prévention des Arrêts de Chantier</h3>
            <p style={{color:'#A0AEC0',fontSize:'14px',lineHeight:'1.6'}}>L'élimination des fautes d'inattention protège les vies humaines et évite les arrêts d'exploitation qui coûtent des millions de dollars.</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{borderTop:'1px solid rgba(243,156,18,0.1)',padding:'40px 24px',textAlign:'center',color:'#718096',fontSize:'13px'}}>
        <p>© 2026 MT MULTISERVICES LLC (Atlanta, GA / Conakry). SAM CAGE: 9P1S2 | UEI: Y9V5ZYELH4Q8</p>
        <p style={{marginTop:'8px'}}>Technologies Numériques pour l'Excellence Opérationnelle et la Sécurité Industrielle en Guinée.</p>
      </footer>
    </>
  )
}
