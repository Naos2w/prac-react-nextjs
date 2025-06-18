type Post = {
  slug: string;
  title: string;
  date: string;
  content: string;
};

const getData: () => Promise<Post[]> = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const res: Post[] = [];
  const nowDate = new Date().getDate();

  for (let i = 1; i < 13; i++) {
    res.push({
      slug: "post-" + i,
      title: "Post " + i,
      date: new Date(new Date().setDate(nowDate + i))
        .toISOString()
        .replace("T", " ")
        .replace(/-/g, "/")
        .substring(0, 10),
      content: "This is post " + i,
    });
  }
  return res;
};

export default getData;
