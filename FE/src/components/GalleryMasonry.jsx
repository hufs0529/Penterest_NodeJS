import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';

import Masonry from '@mui/lab/Masonry';
import ImageDetail from './ImageDetail';
import axios from "axios";
import Nav from './Nav';

// // 관리용 라벨링창 가동시 활성화
// import { Paper } from '@mui/material';
// import { styled } from '@mui/material/styles';

// // 관리용 라벨링창 기능
// const Label = styled(Paper)(({ theme }) => ({
//     backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//     ...theme.typography.body2,
//     padding: theme.spacing(0.5),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
//     borderBottomLeftRadius: 0,
//     borderBottomRightRadius: 0,
// }));

// 코드 시작

export default function GalleryMasonry() {

    // 더미데이터 실행시 꺼놓을 것 (return까지)
    const [value, setValue] = useState("");
    const [itemData, setItemData] = useState([]);

    useEffect(() => {
        const config = {
            "Content-Type": 'application/json',
            withCredentials: true
        };

        axios.put('http://34.64.205.73:9200/penterest_elastic/_settings', {
            "analysis": {
                "analyzer": {
                    "my_custom_analyzer": {
                        "type": "custom",
                        "tokenizer": "whitespace",
                        "filter": ["lowercase", "stop", "snowball"]
                    }
                }
            }
        })


        axios.post('http://34.64.205.73:9200/penterest_elastic/_search', {
            query: {
                match: {
                    caption: value
                }
            }
        }, config)
            .then(function (response) {
                //console.log(response.data)
                //setItemData(['https://images.unsplash.com/photo-1518756131217-31eb79b20e8f'])
                setItemData([...response.data.hits.hits])
                console.log(response.data.hits.hits)
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [value]);

    return (
        <Box sx={{
            width: '100%',
            minWidth: 500,
            minHeight: 829,
            pt: '90px',
            display: 'flex',
            justifyContent: 'center',
            // backgroundColor: 'cyan'
        }}>
            {/* 더미데이터 실행시 꺼놓을 것 */}
            <Nav setValue={setValue} />
            <Masonry columns={{ xs: 2, sm: 3, md: 4, lg: 5, xl: 6 }} spacing={2}>
                {itemData.map((item, index) => (
                    <div
                        key={index}
                    >
                        {/* 이미지 순서 확인용 라벨-관리용 */}
                        {/* <Label>{index + 1}</Label> */}

                        {/* 클릭시 이미지 페이지 모달 연결 */}
                        <ImageDetail
                            item={item}
                            index={index}
                        />
                    </div>
                ))}
            </Masonry>
        </Box>
    );
}

// 더미 데이터
// const itemData = [
//     {
//         img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
//         title: 'Fern',
//     },
//     {
//         img: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f',
//         title: 'Snacks',
//     },
//     {
//         img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
//         title: 'Mushrooms',
//     },
//     {
//         img: 'https://images.unsplash.com/photo-1529655683826-aba9b3e77383',
//         title: 'Tower',
//     },
//     {
//         img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
//         title: 'Sea star',
//     },
//     {
//         img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
//         title: 'Honey',
//     },
//     {
//         img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
//         title: 'Basketball',
//     },
//     {
//         img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
//         title: 'Breakfast',
//     },
//     {
//         img: 'https://images.unsplash.com/photo-1627328715728-7bcc1b5db87d',
//         title: 'Tree',
//     },
//     {
//         img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
//         title: 'Burger',
//     },
//     {
//         img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
//         title: 'Camera',
//     },
//     {
//         img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
//         title: 'Coffee',
//     },
//     {
//         img: 'https://images.unsplash.com/photo-1627000086207-76eabf23aa2e',
//         title: 'Camping Car',
//     },
//     {
//         img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
//         title: 'Hats',
//     },
//     {
//         img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
//         title: 'Tomato basil',
//     },
//     {
//         img: 'https://images.unsplash.com/photo-1627328561499-a3584d4ee4f7',
//         title: 'Mountain',
//     },
//     {
//         img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
//         title: 'Bike',
//     },
// ];