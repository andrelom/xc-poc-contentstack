const settings = {
  revalidate: parseInt(process.env.NEXT_REVALIDATE ?? '60'),
}

export default settings
