import { Grid } from "@mui/material";
import { ProductImageModel } from "@/models";
import { ImageFill } from "@/components";
type Props = {
  images: ProductImageModel[];
  thumbnail: string;
};

const Left = ({ images, thumbnail }: Props) => {
  return images.length === 1 ? (
    <ImageFill src={images[0].path} alt="" height="133%" />
  ) : (
    <Grid container columnSpacing={2} rowSpacing={2}>
      {images.map((image) => {
        return (
          <Grid item key={image.id} xs={12} md={6}>
            <ImageFill src={image.path} alt="" height="133%" />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Left;
