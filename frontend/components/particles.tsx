"use client"

import { useCallback, useEffect, useState } from "react"
import ReactParticles from "react-tsparticles"
import { loadSlim } from "tsparticles-slim"
import type { Container, Engine } from "tsparticles-engine"

interface ParticlesProps {
  className?: string
  quantity?: number
}

export function Particles({ className, quantity = 80 }: ParticlesProps) {
  const [particleColors, setParticleColors] = useState(["#14b8a6", "#0d9488", "#0f766e"])

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine)
  }, [])

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    await container?.refresh()
  }, [])

  useEffect(() => {
    // Listen for accent color changes
    const handleAccentColorChange = (event: CustomEvent) => {
      setParticleColors(event.detail.colors)
    }

    window.addEventListener("accentColorChange", handleAccentColorChange as EventListener)

    // Set initial colors if available
    if (window.accentParticleColors) {
      setParticleColors(window.accentParticleColors)
    }

    return () => {
      window.removeEventListener("accentColorChange", handleAccentColorChange as EventListener)
    }
  }, [])

  return (
    <ReactParticles
      className={className}
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        background: {
          color: {
            value: "transparent",
          },
        },
        fpsLimit: 60,
        particles: {
          color: {
            value: particleColors,
          },
          links: {
            color: particleColors[0],
            distance: 150,
            enable: true,
            opacity: 0.2,
            width: 1,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: true,
            speed: 1,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: quantity,
          },
          opacity: {
            value: 0.3,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 3 },
          },
        },
        detectRetina: true,
      }}
    />
  )
}
