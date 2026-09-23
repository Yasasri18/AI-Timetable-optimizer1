import pytest

from app import app
from config import HAS_SUPABASE_CONFIG


@pytest.fixture
def client():
    app.config.update(TESTING=True)
    with app.test_client() as client:
        yield client


def test_app_starts(client):
    response = client.get('/api/health')
    assert response.status_code == 200
    data = response.get_json()
    assert data['status'] == 'ok'
    assert data['service'] == 'Smart Academic Timetable Optimizer'


@pytest.mark.skipif(not HAS_SUPABASE_CONFIG, reason='Supabase is not configured for database-backed tests.')
def test_database_routes(client):
    departments = client.get('/api/departments')
    assert departments.status_code == 200
    data = departments.get_json()
    assert isinstance(data, list)
    assert len(data) >= 1

    courses = client.get('/api/courses?semester=3')
    assert courses.status_code == 200
    payload = courses.get_json()
    assert isinstance(payload, list)

    summary = client.get('/api/timetable/data?semester=3')
    assert summary.status_code == 200
    summary_data = summary.get_json()
    assert summary_data['success'] is True
    assert summary_data['semester'] == 3

    for endpoint in ('/api/faculty', '/api/rooms', '/api/time-slots'):
        reference_response = client.get(endpoint)
        assert reference_response.status_code == 200
        assert isinstance(reference_response.get_json(), list)

    groups = client.get('/api/student-groups?semester=3')
    assert groups.status_code == 200
    assert len(groups.get_json()) >= 1

    timetable = client.get('/api/timetable/43202565-6691-4cbb-9045-6a7e18584c29')
    assert timetable.status_code == 200
    timetable_data = timetable.get_json()
    assert len(timetable_data['entries']) == 254
    assert all(entry['course'] and entry['faculty'] and entry['group'] and entry['room'] and entry['time_slot'] for entry in timetable_data['entries'])

    timetables = client.get('/api/timetables')
    assert timetables.status_code == 200
    timetable_rows = timetables.get_json()
    assert isinstance(timetable_rows, list)
    assert any(row['id'] == '19aedfbd-291f-4be7-832f-4557440f2cbc' for row in timetable_rows)

    empty_timetables = client.get('/api/timetables?academic_year=not-a-real-year&semester=8')
    assert empty_timetables.status_code == 200
    assert empty_timetables.get_json() == []
