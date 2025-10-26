export function Card({ children, className = "" }) {
  return <div className={`bg-white border rounded-xl shadow-sm ${className}`}>{children}</div>
}

export function CardHeader({ children }) {
  return <div className="border-b p-4">{children}</div>
}

export function CardTitle({ children }) {
  return <h2 className="text-lg font-semibold">{children}</h2>
}

export function CardContent({ children }) {
  return <div className="p-4">{children}</div>
}
