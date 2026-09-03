import { useEffect, useState } from 'react'

function Exercicio4() {
  const [usuarios, setUsuarios] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)

  useEffect(() => {
    const controle = new AbortController()  // cria um controle
    const signal = controle.signal          // o signal vigia a requisição

    async function buscar() {
      try {
        setCarregando(true)
        setErro(null)
        const resp = await fetch('https://jsonplaceholder.typicode.com/users', { signal })
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`)

        // 🔧 TESTE: simula resposta vazia (substitui a linha real por enquanto)
        // const data = await resp.json()
        const data = []

        setUsuarios(data)
      } catch (e) {
        if (e.name !== 'AbortError') {
          // Ignora AbortError: é quando nós mesmos cancelamos
          setErro(e.message)
        }
      } finally {
        setCarregando(false)
      }
    }

    buscar()

    // Cleanup: ao desmontar, cancela a requisição em andamento
    return () => controle.abort()
  }, [])

  if (carregando) return <p>Carregando...</p>
  if (erro) return <p>Erro: {erro}</p>
  if (usuarios.length === 0) return <p>Nenhum usuário encontrado.</p>

  return (
    <ul>
      {usuarios.map(u => (
        <li key={u.id}>{u.name}</li>
      ))}
    </ul>
  )
}

export default Exercicio4