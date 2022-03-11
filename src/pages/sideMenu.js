const sideMenus = [
    {
        name : '에너지 현황',
        path : '/current',
        tree : []
    },
    {
        name : '공정별 에너지 사용량',
        path : '#',
        tree : [
            {
                name : '공정 A',
                path : '/process/a'
            },
            {
                name : '공정 B',
                path : '/process/b'
            },
            {
                name : '공정 C',
                path : '/process/c'
            }
        ]
    },
    {
        name : '유형별 에너지 사용량',
        path : '#',
        tree : [
            {
                name : '스팀',
                path : '/type/steam'
            },
            {
                name : '가스',
                path : '/type/gas'
            },
            {
                name : '전기',
                path : '/type/electric'
            },
        ]
    },
    {
        name : 'Test',
        path : '/test',
        tree : []
    }
]

export default sideMenus