import { formatDuration } from '@/lib/circuits'

export async function generateStoryImage(opts: {
  backgroundColor: string
  gymName: string
  userName: string
  circuitNumber: number
  routesCount: number
  durationSeconds: number
  instagramHandle?: string
}): Promise<string> {
  const canvas = document.createElement('canvas')
  canvas.width = 1080
  canvas.height = 1920
  const ctx = canvas.getContext('2d')
  if (!ctx) return ''

  const { backgroundColor, gymName, userName, circuitNumber, routesCount, durationSeconds, instagramHandle } = opts

  ctx.fillStyle = backgroundColor || '#1a1a2e'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  ctx.fillStyle = 'rgba(0,0,0,0.35)'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  ctx.fillStyle = '#ffffff'
  ctx.textAlign = 'center'
  ctx.font = 'bold 56px Inter, system-ui, sans-serif'
  ctx.fillText(gymName.toUpperCase(), canvas.width / 2, 180)

  ctx.font = 'bold 96px Inter, system-ui, sans-serif'
  ctx.fillText(userName, canvas.width / 2, 920)

  ctx.font = 'bold 72px Inter, system-ui, sans-serif'
  ctx.fillText(`CIRCUIT ${circuitNumber} TERMINÉ ! 🎉`, canvas.width / 2, 1050)

  ctx.font = '48px Inter, system-ui, sans-serif'
  ctx.fillStyle = 'rgba(255,255,255,0.9)'
  ctx.fillText(
    `${routesCount} voies • ${formatDuration(durationSeconds)}`,
    canvas.width / 2,
    1180
  )

  ctx.font = '40px Inter, system-ui, sans-serif'
  ctx.fillText('#escalade #débutant', canvas.width / 2, 1320)

  if (instagramHandle) {
    const handle = instagramHandle.startsWith('@') ? instagramHandle : `@${instagramHandle}`
    ctx.fillText(handle, canvas.width / 2, 1400)
  }

  ctx.font = '32px Inter, system-ui, sans-serif'
  ctx.fillStyle = 'rgba(255,255,255,0.6)'
  ctx.fillText('SUPR Climb Guide', canvas.width / 2, 1820)

  return canvas.toDataURL('image/png')
}
