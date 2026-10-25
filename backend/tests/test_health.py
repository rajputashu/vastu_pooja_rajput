from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_root() -> None:
    response = client.get("/")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"


def test_versioned_health() -> None:
    response = client.get("/api/v1/health")
    assert response.status_code == 200
    body = response.json()
    assert body == {"status": "ok", "service": "pooja-rajput-vastu", "version": "0.1.0"}


def test_unknown_path() -> None:
    response = client.get("/missing")
    assert response.status_code == 404
    assert "error" in response.json()
