import TerminalDrawing from "./_components/TerminalDrawing"


const page = () => {
  return (
    <div>
      <section>
        <div className="flex items-center">
          <div className="font-bold mt-32">
            <span className="text-sm">Hi, I am</span>
            <h1 className='text-6xl'>
              <span className="">Popsy </span>
              <span>pops, software Developer and CS enthusiast</span>
            </h1>
            <span>I develop websites, software tailored to customer needs, we are professional in creating digital markets and networks for growing businesses.</span>
          </div>
          <div>
            <TerminalDrawing />
          </div>
        </div>
      </section>
    </div>
  )
}

export default page