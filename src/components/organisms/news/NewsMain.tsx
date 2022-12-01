import * as React from 'react'
import Link from 'next/link';
import { Box, Divider, Typography } from '@mui/material';
import { URL } from 'url';

type NewsType = {
  author: string | null;
  content: string | null;
  description: string | null;
  publishedAt: string | null;
  source: {id: number | string | null, name: string | null};
  title: string | null;
  url: URL;
  urlToImage: string | null;
}

const NewsMain = () => {
  const [news, setNews] = React.useState<Array<NewsType> | null>(null);
  const url = fetch(`https://newsapi.org/v2/top-headlines?country=jp&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`);
  
  React.useEffect(() => {
    url.then((res) => {
      res.json().then((result) => {
        setNews(result.articles);
      });
    });
    console.log(news)
  }, []);

  return (
    <Box component='main' m='64px auto 32px'>
      <Box width='1024px' mt={6}>
        <Typography variant='h4' fontWeight='bold' marginBottom={2}>
          今日のニュース
        </Typography>
        <Divider />
        <Box marginTop={5} bgcolor='#fff'>
          {news &&
            news.map((data, index) => {
              return (
                <Box key={index}>
                  <Link href={data.url} target='_blank' rel='noreferrer noopener'>
                    <Box height='100px' display='flex' justifyContent='space-around' alignItems='center'>
                      <Box width='60%'>
                        <Typography fontWeight='bold'>{data.title}</Typography>
                      </Box>
                      {data.urlToImage &&
                        <img src={data.urlToImage} alt='画像' height='80px' width='auto' />
                        // next.js Imageコンポーネントでは、表示できなかった為、imgタグを使用。
                        // <Image src={data.urlToImage} alt='image' fill />
                      }
                    </Box>
                  </Link>
                  <Divider />
                </Box>
              )
            })
          }
        </Box>
      </Box>
    </Box>
  )
}

export default NewsMain;