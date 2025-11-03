"use client";
import React, { useEffect, useState } from "react";

function loadGoogleMaps(apiKey) {
  return new Promise((resolve, reject) => {
    if (typeof window !== "undefined" && window.google && window.google.maps) {
      resolve();
      return;
    }
    const existing = document.querySelector("script[data-mappicker='google-maps']");
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", (e) => reject(e));
      return;
    }
    const script = document.createElement("script");
    script.src = `https://maps.gomaps.pro/maps/api/js?key=${apiKey}`;
    script.async = true;
    script.defer = true;
    script.setAttribute("data-mappicker", "google-maps");
    script.onload = () => resolve();
    script.onerror = (e) => reject(e);
    document.head.appendChild(script);
  });
}

export default function MapPicker({
  value,
  onChange,
  apiKey = "AIzaSyBhIji1bDvck4KSC0-JzUsKUcUaFbCTcv4",
  height = 400,
  buttonLabel = "Pick Location on Map",
}) {
  const [showMap, setShowMap] = useState(false);
  const [mapReady, setMapReady] = useState(false);
  const [tempCoords, setTempCoords] = useState(null);
  const [locating, setLocating] = useState(false);
  const [locationError, setLocationError] = useState(null);

  // Get current location when map opens
  useEffect(() => {
    if (!showMap) return;
    
    setLocating(true);
    setLocationError(null);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setTempCoords(coords);
          setLocating(false);
        },
        (error) => {
          console.error("Location error:", error);
          setLocationError("Location access denied or unavailable");
          setLocating(false);
          // Fallback to default if location fails
          setTempCoords({ lat: 23.8103, lng: 90.4125 });
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    } else {
      setLocationError("Geolocation not supported");
      setLocating(false);
      setTempCoords({ lat: 23.8103, lng: 90.4125 });
    }
  }, [showMap]);

  useEffect(() => {
    if (!showMap) return;
    let mounted = true;
    loadGoogleMaps(apiKey)
      .then(() => {
        if (!mounted) return;
        setMapReady(true);
      })
      .catch(() => {
        setMapReady(false);
      });
    return () => {
      mounted = false;
    };
  }, [showMap, apiKey]);

  useEffect(() => {
    if (!showMap || !mapReady || !tempCoords || !document.getElementById("mappicker-map")) return;

    const map = new window.google.maps.Map(
      document.getElementById("mappicker-map"),
      { 
        center: tempCoords, 
        zoom: 18,
        mapTypeId: 'satellite' // Satellite view
      }
    );

    const marker = new window.google.maps.Marker({ 
      position: tempCoords, 
      map, 
      draggable: true 
    });

    marker.addListener("dragend", (e) => {
      setTempCoords({ lat: e.latLng.lat(), lng: e.latLng.lng() });
    });

    // Re-center to current location button
    const recenterWrapper = document.createElement("div");
    recenterWrapper.style.cssText =
      "background:#fff;padding:10px 12px;margin:10px;border-radius:5px;box-shadow:0 2px 6px rgba(0,0,0,0.3);cursor:pointer;font-size:14px;font-weight:500;display:flex;align-items:center;gap:6px";
    recenterWrapper.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"></circle>
        <circle cx="12" cy="12" r="3"></circle>
      </svg>
      <span>My Current Location</span>
    `;
    recenterWrapper.onclick = () => {
      if (navigator.geolocation) {
        recenterWrapper.style.opacity = "0.5";
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const position = { lat: pos.coords.latitude, lng: pos.coords.longitude };
            map.setCenter(position);
            marker.setPosition(position);
            setTempCoords(position);
            recenterWrapper.style.opacity = "1";
          },
          () => {
            alert("Location access denied.");
            recenterWrapper.style.opacity = "1";
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
          }
        );
      } else {
        alert("Geolocation not supported.");
      }
    };
    map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(recenterWrapper);

    // Map type toggle button
    const toggleWrapper = document.createElement("div");
    toggleWrapper.style.cssText =
      "background:#fff;padding:10px 12px;margin:10px;border-radius:5px;box-shadow:0 2px 6px rgba(0,0,0,0.3);cursor:pointer;font-size:14px;font-weight:500";
    toggleWrapper.textContent = "🗺️ Roadmap";
    toggleWrapper.onclick = () => {
      if (map.getMapTypeId() === 'satellite') {
        map.setMapTypeId('roadmap');
        toggleWrapper.textContent = "🛰️ Satellite";
      } else {
        map.setMapTypeId('satellite');
        toggleWrapper.textContent = "🗺️ Roadmap";
      }
    };
    map.controls[window.google.maps.ControlPosition.TOP_RIGHT].push(toggleWrapper);

  }, [showMap, mapReady, tempCoords]);

  const confirm = () => {
    if (onChange && tempCoords) {
      onChange({ lat: tempCoords.lat, lng: tempCoords.lng });
    }
    setShowMap(false);
  };

  return (
    <div className="mt-4">
      <button
        type="button"
        onClick={() => setShowMap(true)}
        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
        </svg>
        {buttonLabel}
      </button>

      {value && value.lat && value.lng && (
        <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded-md">
          <p className="text-sm text-green-800 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-green-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Location selected: <span className="font-medium ml-1">{Number(value.lat).toFixed(6)}, {Number(value.lng).toFixed(6)}</span>
          </p>
        </div>
      )}

      {showMap && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg overflow-hidden w-full max-w-4xl">
            <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
              <h3 className="font-medium">
                {locating ? "Detecting your location..." : "Select Location on Map"}
              </h3>
              <button onClick={() => setShowMap(false)} className="text-gray-500 hover:text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            
            {locationError && (
              <div className="p-2 bg-yellow-50 text-yellow-800 text-sm text-center">
                ⚠️ {locationError}
              </div>
            )}

            {locating ? (
              <div className="w-full flex items-center justify-center" style={{ height }}>
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Getting your accurate location...</p>
                </div>
              </div>
            ) : (
              <div id="mappicker-map" className="w-full" style={{ height }} />
            )}

            <div className="flex justify-end p-4 bg-gray-50 border-t">
              <button onClick={() => setShowMap(false)} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md mr-2 hover:bg-gray-300 transition-colors">
                Cancel
              </button>
              <button 
                onClick={confirm} 
                disabled={!tempCoords}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Confirm Location
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}