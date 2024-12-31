type Props = {
  progress: number
}

export default function Component({ progress }: Props) {
  return (
    <div className={`h-[3px] w-full rounded-lg bg-gray-500/20`}>
      <div
        style={{
          width: `${progress}%`,
        }}
        className={`h-full rounded-lg transition-all duration-300 ${
          progress === 100 ? 'bg-green-500' : 'bg-blue-500'
        }`}
      ></div>
    </div>
  )
}
