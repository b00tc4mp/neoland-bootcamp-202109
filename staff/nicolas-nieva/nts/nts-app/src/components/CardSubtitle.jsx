import { Card } from "react-bootstrap";
import "./CardSubtitle.css";

export default function CardSubtitle({ imageSrc, title, text}) {
  return (
    <Card id='cardsubtitle' className="bg-dark text-white border-0">
      <Card.Img className="CardSubtitle__image" src={imageSrc} />
      <Card.ImgOverlay className='d-flex flex-column justify-content-center align-items-center bg-secondary text-white'>
        <Card.Title>{title}</Card.Title>
        <Card.Text className='text-center'>{text}</Card.Text>
      </Card.ImgOverlay>
    </Card>
  );
}