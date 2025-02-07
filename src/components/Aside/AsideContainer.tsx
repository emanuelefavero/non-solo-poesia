export default function Component({ children }: { children: React.ReactNode }) {
  return <section className='flex flex-1 flex-col gap-20'>{children}</section>
}
