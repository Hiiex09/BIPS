export function Sidebar() {
  return (
    <div className="flex flex-col gap-6">
      <div className="card bg-primary text-primary-content">
        <div className="card-body">
          <h3 className="card-title">Emergency Hotlines</h3>
          <p>Barangay Desk: (02) 8888‑1234</p>
          <p>Police: (02) 8123‑4567</p>
          <button className="btn btn-error btn-block">Call Hotline</button>
        </div>
      </div>

      <div className="card bg-base-100 shadow border">
        <div className="card-body">
          <h3 className="card-title">Information Center</h3>
          <ul className="menu">
            <li>
              <a href="/about">Community Profile</a>
            </li>
            <li>
              <a href="/announcements">Transparency Board</a>
            </li>
            <li>
              <a href="/services">Citizen’s Charter</a>
            </li>
            <li>
              <a href="/services">Downloadable Forms</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
