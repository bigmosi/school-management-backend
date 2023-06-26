const roles = {
    admin: {
        permissions: ['students:read', 'students:write', 'admissions:read', 'admissions:write', 'attendance:read', 'attendance:write', 'reports:read', 'classes:read', 'classes:write', 'teachers:read', 'teachers:write', 'schedules:write', 'subjects:read', 'subjects:write'],
    },
    teacher: {
        permissions: ['students:read', 'attendance:read', 'attendance:write', 'schedules:read']
    },
    student: {
        permissions: ['students:read', 'attendance:read'],
      }
}

module.exports = roles;