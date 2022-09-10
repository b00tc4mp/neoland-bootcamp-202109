import { Button, Card } from "react-bootstrap";
import "./Hero.css";

export default function Hero({ imageSrc, title, text, text2, onClick, buttonText }) {
  return (
    <Card id="hero" className="bg-dark text-white border-0">
      <Card.Img className="Hero__image" src={imageSrc} />
      <Card.ImgOverlay className='d-flex flex-column justify-content-center'>
        <Card.Title className='fs-2 px-2 px-md-5 mb-2'>{title}</Card.Title>
        <Card.Text className='mt-2 px-2 px-md-5'>{text}<br/>{text2}</Card.Text>
        <Button className='mx-2 mx-md-5' style={{ maxWidth: '170px' }} onClick={onClick}>{buttonText}</Button>
      </Card.ImgOverlay>
    </Card>
  );
}