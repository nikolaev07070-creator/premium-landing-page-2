export type ZirconiaCaseImage = string | { src: string; rotate?: number };

export type ZirconiaCase = {
  id: string
  cover: string
  images: ZirconiaCaseImage[]
  layout?: "default" | "landscape"
}

export const zirconiaCases: ZirconiaCase[] = [
  {
    id: "07",
    cover: "/portfolio/07.png",
    images: [
      "/portfolio/zirconia/03.ipg.png",
      "/portfolio/zirconia/04.ipg.png",
      "/portfolio/zirconia/00.jpg",
      "/portfolio/zirconia/3W.jpg",
      "/portfolio/zirconia/4W.jpg",
      "/portfolio/zirconia/5W.jpg",
      "/portfolio/zirconia/6W.jpg"
    ]
  },
  {
    id: "08",
    cover: "/portfolio/08.png",
    images: [
      "/portfolio/zirconia/01.ipg.png",
      "/portfolio/zirconia/02.ipg.png",
      "/portfolio/zirconia/05.ipg.png",
      "/portfolio/zirconia/09.png",
      "/portfolio/zirconia/3R.jpg",
      "/portfolio/zirconia/4R.jpg",
      "/portfolio/zirconia/5R.jpg",
      "/portfolio/zirconia/6R.jpg",
      "/portfolio/zirconia/7R.jpg"
    ]
  },
  {
    id: "09",
    cover: "/portfolio/zirconia/1Y7A.jpg",
    images: [
      "/portfolio/zirconia/1Y7.jpg",
      "/portfolio/zirconia/1Y7A.jpg",
      "/portfolio/zirconia/1Y7A2074.jpg",
      "/portfolio/zirconia/1Y7A2080.jpg",
      "/portfolio/zirconia/1Y7A5846.jpg",
      "/portfolio/zirconia/1Y7A5854.jpg"
    ]
  },
  {
    id: "10",
    cover: "/portfolio/zirconia/1Q7A.jpg",
    layout: "landscape",
    images: [
      { src: "/portfolio/zirconia/1Q7A.jpg" },
      { src: "/portfolio/zirconia/1Q7A7671.jpg" },
      "/portfolio/zirconia/1Q7A7673.jpg",
      "/portfolio/zirconia/1Q7A7674.jpg",
      "/portfolio/zirconia/1Q7A7675.jpg",
      "/portfolio/zirconia/1Q7A7684.jpg",
      "/portfolio/zirconia/1Q7A7688.jpg",
      "/portfolio/zirconia/1Q7A7689.jpg",
      "/portfolio/zirconia/1Q7A7690.jpg",
      "/portfolio/zirconia/1Q7A7691.jpg"
    ]
  }
]
