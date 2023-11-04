import { useRouteError } from 'react-router-dom'

export default function ErrorPage() {
  const error = useRouteError()
  console.error(error)

  return (
    <div className="error-page">
      <h1>404!</h1>
      <p>This page doesn't seem to exist!</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  )
}