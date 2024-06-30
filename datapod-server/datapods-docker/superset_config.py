
# Flask-WTF flag for CSRF
# WTF_CSRF_ENABLED = False
SQLALCHEMY_DATABASE_URI = 'postgresql://superset:superset@db:5432/superset'
ROW_LIMIT = 5000

# TALISMAN_ENABLED = False #Work for http request, commented out for https

ENABLE_CORS = True
CORS_OPTIONS = {
    # "origins": ["*"],  # Adjust to restrict origins if needed
    "origins": ["https://landingpage.datapods-docker.orb.local/"],
    "methods": ["GET", "POST", "OPTIONS"],
    "allow_headers": ["Content-Type", "Authorization"],
    "supports_credentials": True,
}

# You might also need to set up a secure secret key
SECRET_KEY = 'bWiEFiYwOv7cgUnU/1aItcKmYfnAqoOnCiuMYV+lDNeYZz3iMz1SU2pD'
WTF_CSRF_SECRET_KEY = 'bWiEFiYwOv7cgUnU/1aItcKmYfnAqoOnCiuMYV+lDNeYZz3iMz1SU2pD'
WTF_CSRF_METHODS = {'POST', 'PUT', 'PATCH'}
WTF_CSRF_EXEMPT_LIST = ['https://landingpage.datapods-docker.orb.local/']
SESSION_COOKIE_SAMESITE = "None"
SESSION_COOKIE_SECURE = True  # True if using HTTPS
ENABLE_PROXY_FIX = True
EMBEDDED_SUPERSET=True

SESSION_COOKIE_HTTPONLY = True
HTTP_HEADERS = {'X-Frame-Options': 'ALLOWALL'}
FEATURE_FLAGS = {"ALERT_REPORTS": True, "EMBEDDED_SUPERSET": True}

AUTH_USER_REGISTRATION = True
AUTH_USER_REGISTRATION_ROLE = "Public"

AUTH_ROLES_MAPPING = {
"superset_users": ["Gamma","Alpha"],
"superset_admins": ["Admin"],
}

