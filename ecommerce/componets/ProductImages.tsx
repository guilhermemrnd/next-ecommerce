import { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
`;
const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
`;
const ThumbsWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;
const ImageThumb = styled.div<{ active?: boolean }>`
  border: 1px solid ${(props) => (props?.active ? "#ccc" : "transparent")};
  height: 40px;
  padding: 2px;
  border-radius: 5px;
  cursor: pointer;
`;

export default function ProductImages({ images }: { images: string[] }) {
  const [activeImage, setActiveImage] = useState(images?.[0]);

  return (
    <>
      <Wrapper>
        <Image src={activeImage} alt="" />
      </Wrapper>
      <ThumbsWrapper>
        {images.length > 1 &&
          images.map((img) => (
            <ImageThumb key={img} onClick={() => setActiveImage(img)} active={activeImage === img}>
              <Image src={img} alt="" />
            </ImageThumb>
          ))}
      </ThumbsWrapper>
    </>
  );
}
