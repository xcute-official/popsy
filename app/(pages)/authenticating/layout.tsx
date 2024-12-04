interface LayoutProps {
    children: React.ReactNode;
}
const layout = ({children}:LayoutProps) => {
  return (
    <div className="mt-32 w-full">
        <div className="mx-auto">
          {children}
        </div>
    </div>
  )
}

export default layout