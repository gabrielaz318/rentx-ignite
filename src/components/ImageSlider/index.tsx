import React, { useRef, useState } from 'react';
import { FlatList, ViewToken } from 'react-native';
import { Bullet } from '../Bullet';

import {
    Container,
    ImageIndexes,
    CarImageWrapper,
    CarImage,
} from './styles';

interface Props {
    imagesUrl: string[];
}

interface ChangeImageProps {
    viewableItems: ViewToken[];
    change: ViewToken[];
}

export function ImageSlider({ imagesUrl }: Props) {
    const [imageIndex, setIndexImage] = useState(0);

    const indexChanged = useRef((info: ChangeImageProps) => {
        setIndexImage(info.viewableItems[0].index!)
    });

    return (
        <Container>
            <ImageIndexes>
                {imagesUrl.map((_, index) => <Bullet active={imageIndex === index} key={index} />)}
            </ImageIndexes>

            
                <FlatList 
                    data={imagesUrl}
                    keyExtractor={item => item}
                    renderItem={({item}) => (
                        <CarImageWrapper>
                        <CarImage
                            source={{uri: item }}
                            resizeMode='contain'
                        />
                        </CarImageWrapper>
                    )}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onViewableItemsChanged={indexChanged.current}
                />
        </Container>
    );
}