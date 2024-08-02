import { useState } from "react";
import { PrettyChatWindow } from "react-chat-engine-pretty";
import { FaCog, FaUserFriends, FaSignOutAlt } from "react-icons/fa";
import axios from "axios";

const ChatsPage = (props) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactsVisible, setContactsVisible] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogout = () => {
    // Efface les données d'authentification
    localStorage.removeItem("authToken");
    // Redirige l'utilisateur vers la page de connexion
    window.location.href = "/login";
  };

  const fetchContacts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:8000/api/users"); // Assurez-vous que cette URL est correcte
      setContacts(response.data);
      setContactsVisible(true);
    } catch (error) {
      console.error("Erreur lors de la récupération des contacts:", error);
      setError("Impossible de récupérer la liste des contacts.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ height: "100vh", position: "relative" }}>
      <PrettyChatWindow
        projectId="3c69d83e-f282-40c9-8798-e34476d1dc4a"
        username={props.user.username}
        secret={props.user.secret}
        style={{ height: "100vh" }}
      />

      {/* Icône d'engrenage */}
      <div
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          cursor: "pointer",
        }}
      >
        <FaCog size={24} color="#fff" />
      </div>

      {/* Menu déroulant */}
      {menuOpen && (
        <div
          style={{
            position: "absolute",
            top: 60,
            right: 20,
            backgroundColor: "#fff",
            border: "1px solid #ddd",
            borderRadius: 4,
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
            zIndex: 1000,
          }}
        >
          <button
            onClick={() => {
              fetchContacts();
              setMenuOpen(false);
            }}
            style={{
              display: "block",
              padding: 10,
              border: "none",
              backgroundColor: "#fff",
              width: "100%",
              textAlign: "left",
              cursor: "pointer",
              borderBottom: "1px solid #ddd",
            }}
          >
            <FaUserFriends style={{ marginRight: 8 }} />
            Contacts
          </button>
          <button
            onClick={handleLogout}
            style={{
              display: "block",
              padding: 10,
              border: "none",
              backgroundColor: "#fff",
              width: "100%",
              textAlign: "left",
              cursor: "pointer",
            }}
          >
            <FaSignOutAlt style={{ marginRight: 8 }} />
            Déconnexion
          </button>
        </div>
      )}

      {/* Affichage de la liste des contacts */}
      {contactsVisible && (
        <div
          style={{
            position: "absolute",
            top: 120,
            right: 20,
            backgroundColor: "#fff",
            border: "1px solid #ddd",
            borderRadius: 4,
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
            maxHeight: "60vh",
            overflowY: "auto",
            zIndex: 1000,
          }}
        >
          <div style={{ padding: 10, fontWeight: "bold" }}>Liste des utilisateurs</div>
          {loading && <div style={{ padding: 10 }}>Chargement...</div>}
          {error && <div style={{ padding: 10, color: "red" }}>{error}</div>}
          {contacts.map((contact) => (
            <div
              key={contact.id}
              style={{
                padding: 10,
                borderBottom: "1px solid #ddd",
                cursor: "pointer",
              }}
            >
              {contact.username}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatsPage;
