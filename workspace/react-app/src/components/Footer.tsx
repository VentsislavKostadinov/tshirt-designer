type FooterProps = {
  onAddToCart: () => void
}

export default function Footer({ onAddToCart }: FooterProps) {
  return (
    <footer className="col-lg-2 col-md-12">
      <button type="button" className="btn btn-info footerBut" id="tshirt-add-to-cart" onClick={onAddToCart}>
        Add to basket
      </button>
    </footer>
  )
}