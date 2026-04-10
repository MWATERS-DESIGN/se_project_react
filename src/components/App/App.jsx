import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";
import { coordinates, apiKey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile.jsx";
import { getWeather, filterWeatherData } from "../../utils/weatherAPI";
import Footer from "../Footer/Footer";
import CurrentTemperatureUnitContext from "../../context/CurrentTemperatureUnitContext.js";
import CurrentUserContext from "../../context/CurrentUserContext.js";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import {
  addItem,
  deleteItem,
  getItems,
  addCardLike,
  deleteCardLike,
} from "../../utils/api.js";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";
import * as auth from "../../utils/auth.js";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import EditProfileModal from "../EditProfileModal/EditProfileModal.jsx";
import DeleteConfirmModal from "../DeleteConfirmModal/DeleteConfirmModal.jsx";

function App() {
  const navigate = useNavigate();
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [clothingItems, setClothingItems] = useState([]);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // test by changing to true and seeing if login states appear on modals
  const [currentUser, setCurrentUser] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleEditProfileClick = () => {
    setActiveModal("edit-profile");
  };

  const handleCloseClick = () => {
    setActiveModal("");
  };

  const handleRegisterClick = () => {
    setActiveModal("register");
  };

  const handleLoginClick = () => {
    setActiveModal("login");
  };

  const handleOpenDeleteModal = (card) => {
    setSelectedCard(card);
    setIsDeleteModalOpen(true);
  };

  useEffect(() => {
    if (!activeModal) return;
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        handleCloseClick();
      }
    };
    document.addEventListener("keydown", handleEscClose);
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  const onAddItem = (inputValues) => {
    const newItemData = {
      name: inputValues.name,
      imageUrl: inputValues.imageUrl,
      weather: inputValues.weatherType,
    };

    setIsLoading(true);

    // pass token for protected endpoint

    addItem(newItemData)
      .then((data) => {
        setClothingItems([data, ...clothingItems]);
        handleCloseClick();
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleRegistration = ({ name, email, password, avatar }) => {
    setIsLoading(true);
    // values = { name, email, password, avatar }
    auth
      .signup({ name, email, password, avatar })
      .then(() => {
        // sign the user in right away
        return auth.signin({ email, password });
      })
      .then((data) => {
        // persist token if provided and mark as logged in
        if (data && data.token) {
          localStorage.setItem("jwt", data.token);
          setCurrentUser(data.user);
          setIsLoggedIn(true);

          handleCloseClick();
        }
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  // Added: handleLogin to perform signin, persist token, and update state
  const handleLogin = ({ email, password }) => {
    setIsLoading(true);

    return auth
      .signin({ email, password })
      .then((data) => {
        if (!data || !data.token) {
          // make failures explicit so caller can show password error
          return Promise.reject({ message: "No token returned", status: 401 });
        }

        localStorage.setItem("jwt", data.token);

        return auth.checkToken(data.token);
      })
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
        handleCloseClick();
        return userData;
      })
      .catch((err) => {
        // propagate the error so LoginModal can set serverPasswordError
        return Promise.reject(err);
      })
      .finally(() => setIsLoading(false));
  };

  // New effect: check for stored token and validate with server on mount
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    auth
      .checkToken()
      .then((userData) => {
        // checkToken should return the user's info when token is valid
        if (userData) {
          setCurrentUser(userData);
          setIsLoggedIn(true);
        }
      })
      .catch((err) => {
        console.warn("Token validation failed:", err);
        localStorage.removeItem("jwt");
        setIsLoggedIn(false);
        setCurrentUser(null);
      });
  }, []);

  useEffect(() => {
    const fetchWeatherFor = (coords) => {
      getWeather(coords, apiKey)
        .then((data) => {
          const filteredData = filterWeatherData(data);
          setWeatherData(filteredData);
        })
        .catch(console.error);
    };

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userCoords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          fetchWeatherFor(userCoords);
        },
        (error) => {
          // Permission denied or other error — fallback to default coordinates
          console.warn("Geolocation failed, using default coordinates:", error);
          fetchWeatherFor(coordinates);
        },
        { enableHighAccuracy: false, timeout: 5000, maximumAge: 60000 },
      );
    } else {
      // Geolocation not supported — use default coordinates
      fetchWeatherFor(coordinates);
    }

    getItems()
      .then((data) => {
        setClothingItems([...data].reverse());
      })
      .catch(console.error);
  }, []);

  const handleDeleteItem = (card) => {
    deleteItem(card._id)
      .then(() => {
        setClothingItems(clothingItems.filter((item) => item._id !== card._id));
        handleCloseClick();
      })
      .catch(console.error);
  };

  // Added: handleCardLike to toggle like/unlike and update local state
  const handleCardLike = (item) => {
    const token = localStorage.getItem("jwt");
    const id = item._id;
    const isLiked = item.likes?.includes(currentUser?._id);

    if (!token) {
      console.error("No token found, user must be logged in to like items");
      return;
    }

    if (!isLiked) {
      addCardLike(id)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((item) => (item._id === id ? updatedCard : item)),
          );
        })
        .catch(console.error);
    } else {
      deleteCardLike(id)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((item) => (item._id === id ? updatedCard : item)),
          );
        })
        .catch(console.error);
    }
  };

  // New: handleUpdateProfile to call API and update currentUser
  const handleUpdateProfile = ({ name, avatar }) => {
    setIsLoading(true);
    const token = localStorage.getItem("jwt");
    if (!token) {
      setIsLoading(false);
      return Promise.reject("No auth token");
    }

    return auth
      .updateProfile({ name, avatar })
      .then((updatedUser) => {
        // server should return the updated user object
        if (updatedUser) {
          setCurrentUser(updatedUser);
        }
        handleCloseClick();
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  // confirm delete item
  const handleConfirmDelete = () => {
    if (!selectedCard) return;

    // call existing delete handler and close the confirm modal
    handleDeleteItem(selectedCard);
    setIsDeleteModalOpen(false);
  };

  // sign out: remove token, reset auth state, navigate to main page
  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
    navigate("/");
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page">
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              isLoggedIn={isLoggedIn}
              onRegisterClick={handleRegisterClick}
              onLoginClick={handleLoginClick}
              onLogout={handleSignOut}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    clothingItems={clothingItems}
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      onAddClick={handleAddClick}
                      onCardClick={handleCardClick}
                      onEditProfile={handleEditProfileClick}
                      onLogout={handleSignOut}
                      onCardLike={handleCardLike}
                      clothingItems={clothingItems}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>

            <Footer />
          </div>
          <AddItemModal
            onClose={handleCloseClick}
            isOpen={activeModal === "add-garment"}
            onAddItem={onAddItem}
            isLoading={isLoading}
          />
          <ItemModal
            isOpen={activeModal === "preview"}
            card={selectedCard}
            onClose={handleCloseClick}
            onDeleteItem={handleDeleteItem}
            onOpenDeleteModal={handleOpenDeleteModal}
          />
          <EditProfileModal
            isOpen={activeModal === "edit-profile"}
            onClose={handleCloseClick}
            onUpdateProfile={handleUpdateProfile}
            isLoading={isLoading}
          />
          <RegisterModal
            isOpen={activeModal === "register"}
            onRegister={handleRegistration}
            onClose={handleCloseClick}
            isLoading={isLoading}
            onLoginClick={handleLoginClick}
          />
          <LoginModal
            isOpen={activeModal === "login"}
            onLogin={handleLogin}
            onClose={handleCloseClick}
            isLoading={isLoading}
            onRegisterClick={handleRegisterClick}
          />
          <DeleteConfirmModal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onConfirm={handleConfirmDelete}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
