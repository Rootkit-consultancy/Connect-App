const Profile = ({ user, onLogout }) => {
  return (
    <div style={{ padding: 20, paddingBottom: 100 }}>
      <h2>Profile</h2>
      <p>Signed in as: <strong>{user?.username}</strong></p>
      <button onClick={onLogout} style={{ marginTop: 12 }}>Logout</button>
    </div>
  )
}

export default Profile


