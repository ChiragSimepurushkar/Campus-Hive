import React from 'react'

function Hero() {
  return (
    <section className="flex flex-col items-center justify-center text-center py-20 text-white">
      <h2 className="text-5xl font-extrabold mb-4">Connect. Collaborate. Create.</h2>
      <p className="text-lg mb-8 max-w-xl">
        Find teammates, share ideas, and build amazing projects together — all in one place.
      </p>
      <Button text="Get Started" />
    </section>
  )
}

export default Hero
