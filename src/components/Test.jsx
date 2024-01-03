import { Link } from "react-router-dom";

function PricingCard({
  data = [],
  fee = 0,
  pricingOnly,
  showDelivery,
  children,
}) {
  return (
    <div className="card">
      <div className="card-body">
        <div className="vstack gap-2">
          <div className="d-flex justify-content-between">
            <span>{}</span>
            <span>{data.reduce((p, c) => p + c.quantity, 0)}</span>
          </div>
          <div className="d-flex justify-content-between">
            <span>{}</span>
            <span>
              {}
              &nbsp;{("kyat")}
            </span>
          </div>
          <div className="d-flex justify-content-between">
            <span>{("discount")}</span>
            <span className="text-danger">
              -{}&nbsp;
              {("kyat")}
            </span>
          </div>
          {showDelivery && (
            <div className="d-flex justify-content-between">
              <span>{("delivery_fee")}</span>
              <span className="text-success">
                +{formatPrice(fee)}&nbsp;{("kyat")}
              </span>
            </div>
          )}

          <hr className="text-muted" />

          <div className="d-flex justify-content-between">
            <span className="h5">{("total_price")}</span>
            <span className="fw-bold h5 mb-0">
              {}&nbsp;
              {("kyat")}
            </span>
          </div>

          {!pricingOnly && (
            <div className="d-grid gap-2 mt-3">
              <Link href="/contact-info" passHref>
                <button
                  className="btn btn-primary fw-normal py-2"
                  disabled={data.length === 0}
                >
                  Checkout
                </button>
              </Link>
              <Link href="/books">
                <a className="btn btn-outline-primary fw-normal py-2">
                  Continue Shopping
                </a>
              </Link>
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}

export default PricingCard;