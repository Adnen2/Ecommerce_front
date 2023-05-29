import SideNavbar from "../../components/SideNavbar";

function ProductLayout({ children }) {
  return (
    <div className="row">
      <div className="col-md-3 ml-5">
        <SideNavbar />
      </div>
      <div className="col-md-9 ">
        <div className="pt-4">{children}</div>
      </div>
    </div>
  );
}

export default ProductLayout;
