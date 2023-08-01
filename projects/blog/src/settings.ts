const settings = {
  revalidate: parseInt(process.env.NEXT_REVALIDATE ?? '86400'),
}

export default settings
