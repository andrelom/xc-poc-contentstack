const settings = {
  revalidate: parseInt(process.env.NEXT_REVALIDATE) || Infinity,
}

export default settings
