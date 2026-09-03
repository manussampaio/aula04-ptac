import { useEffect, useState } from 'react'

function Exercicio5() {
  const [dados, setDados] = useState(null)
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

        const data = await resp.json()
        setDados(data)
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
  if (!dados || dados.length === 0) return <p>Nenhum item encontrado.</p>

  return <p>Sucesso: {dados.length} itens carregados.</p>
}

export default Exercicio5