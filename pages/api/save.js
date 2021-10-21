export default async (req, res) => {
  console.log(req.body)
  res.end(req.body)
}