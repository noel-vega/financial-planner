import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/transactions')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Coming soon!</div>
}
