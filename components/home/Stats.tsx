import Odometer from "./Odometer";

export default function Stats() {
  return (
    <section className="home-2-section-9 at-item-anime-area">
      <div className="container pt-100 pb-100">
        <div className="row justify-content-center">
          <div className="col-lg-4 col-md-6 col-6 text-center">
            <h1 className="fz-ds-1 fw-500 mb-0 text-nowrap">
              <Odometer count={12} />
              +
            </h1>
            <h6 className="fw-500">
              Years styling clients <br /> & artists
            </h6>
          </div>
          <div className="col-lg-4 col-md-6 col-6 text-center">
            <h1 className="fz-ds-1 fw-500 mb-0 text-nowrap">
              <Odometer count={850} />
              +
            </h1>
            <h6 className="fw-500">
              Looks styled & <br /> custom pieces made
            </h6>
          </div>
          <div className="col-lg-4 col-md-6 col-6 text-center">
            <h1 className="fz-ds-1 fw-500 mb-0 text-nowrap">
              <Odometer count={120} />+
            </h1>
            <h6 className="fw-500">
              Brands, artists & makers <br /> supplied
            </h6>
          </div>
        </div>
      </div>
    </section>
  );
}
