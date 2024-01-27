
function TestComponent({ name }: { name: string | null }) {
  return (
    <div>{name?.toUpperCase()}</div>
  )
}

export default TestComponent