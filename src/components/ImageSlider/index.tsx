import React, { useRef, useState } from 'react';
import { FlatList, ViewToken } from 'react-native';

import {
    Container,
    ImageIndexes,
    ImageIndex,
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
                {imagesUrl.map((_, index) => <ImageIndex active={imageIndex === index} key={index} />)}
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