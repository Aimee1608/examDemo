import Mock from 'mockjs'
Mock.setup({
  // timeout: 6000
})

// 结果页接口数据————————————————————————————
// 结果分析 /exam/reportAnalysis/{recordId}
 Mock.mock(/exam\/reportAnalysis\/([\w|\?\S*]+)$/, 'get', {
     code: 0,
     msg: 'string',
     data: {
        'rankGrade': '423/999', // 综合年级排名
        'commentTeacher': '学员有很大潜力，在学习上有很多内容需要继续充，加强理解应用练习。具体情况如下：', // 老师评价
        'module': [
            {
            'moduleId': 1, // 模块ID
            'moduleName': '数', // 模块名称
            'questionId': [1, 2, 3, 4, 5, 6], // 题目ID
            'accuracy': 0.40, // 我的正确率
            'accuracyGrade': 0.80, // 年级平均正确率
            'result': '小数、计算、应用”知识点有待提高，“小数、算。“小数、计算、应用”知识点有待提高。' // 诊断结果
            },
            {
            'moduleId': 2, // 模块ID
            'moduleName': '形', // 模块名称
            'questionId': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 14, 14, 14, 14], // 题目ID
            'accuracy': 0.49, // 我的正确率
            'accuracyGrade': 0.90, // 年级平均正确率
            'result': '小数、计算、应用”知识点有待提高，“小数、算。“小数、计算、应用”知识点有待提高。' // 诊断结果
            },
            {
            'moduleId': 3, // 模块ID
            'moduleName': '逻辑', // 模块名称
            'questionId': [1, 2, 3, 4, 5, 6], // 题目ID
            'accuracy': 0.80, // 我的正确率
            'accuracyGrade': 0.67, // 年级平均正确率
            'result': '小数、计算、应用”知识点有待提高，“小数、算。“小数、计算、应用”知识点有待提高。' // 诊断结果
            },
            {
            'moduleId': 4, // 模块ID
            'moduleName': '应用', // 模块名称
            'questionId': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 14, 14, 14], // 题目ID
            'accuracy': 0.90, // 我的正确率
            'accuracyGrade': 0.50, // 年级平均正确率
            'result': '小数、计算、应用”知识点有待提高，“小数、算。“小数、计算、应用”知识点有待提高。' // 诊断结果       
            },
            {
            'moduleId': 5, // 模块ID
            'moduleName': '其他', // 模块名称
            'questionId': [1, 2, 3, 4, 5, 6], // 题目ID
            'accuracy': 0.60, // 我的正确率
            'accuracyGrade': 0.80, // 年级平均正确率
            'result': '小数、计算、应用”知识点有待提高，“小数、算。“小数、计算、应用”知识点有待提高。' // 诊断结果
            }
        ]
     }  
})

// 考试结果 /exam/report/{recordId}/{courseId}
Mock.mock(/exam\/report\/([\w|\?\S*]+)\/([\w|\?\S*]+)/, 'get', {
    code: 0,
    msg: 'string',
    data: {
        'stuId': 1,
        'username': '猫猫毛',
        'showScore': 1, // 1显示 2不显示
        'score': 50,
        'examName': '考试题目',
        'isPass': 0, // 是否通过考试 1是 0否
        'className': '目标班',
        'orderUrl': '//baidu.com',
        'scoreSection': [
            {
                'score': 40,
                'name': '目标班'
            }, {
                'score': 60,
                'name': '目标班'
            }, {
                'score': 70,
                'name': '目标班'
            }, {
                'score': 80,
                'name': '目标班'
            }, {
                'score': 100,
                'name': '目标班'
            }
        ]
    }
})

// 试卷解析 /exam/paperAnalysis/{recordId}
Mock.mock(/exam\/paperAnalysis\/([\w|\?\S*]+)$/, 'get', {
    "code":  0,
    "msg":  "",
    "data":  {
        "segment": [
            {
                    "name":  "一、选择题",
                    "testNum":  4,
                    "description":  "3分每题",
                    "id":  1421,
                    "testLists":  [
                    {
                            "id":  102642,
                            "stem":  "下列分式中，最简分式是（　　）    <br>",
                            "type":  2,
                            "choiceType":  1,
                            "materialId":  0,
                            "serialNum":  0,
                            "categoryId":  0,
                            "audio":  [],
                            "module": '数',
                            "right":  false,
                            "analysis":  "A、原式为最简分式，符合题意；    <br>\nB、原式$$=\\frac{x+1}{\\left(  x+1  \\right)\\left(  x-1  \\right)}=\\frac{1}{x-1}$$，不合题意；    <br>\nC、原式$$=\\frac{{{\\left(  x-y  \\right)}^{2}}}{x\\left(  x-y  \\right)}=\\frac{x-y}{x}$$，不合题意；    <br>\nD、原式$$=\\frac{\\left(  x+6  \\right)\\left(  x-6  \\right)}{2\\left(  x+6  \\right)}=\\frac{x-6}{2}$$，不合题意，    <br>\n故选A    <br>\n考点：最简分式．    <br>\n2016年山东省滨州市中考数学试卷4",
                            "stuAnswer": [
                                {
                                    "content":  "$$\\frac{{{x}^{2}}-36}{2x+12}$$ 00 <br>",
                                    "is_right":  "0",
                                    "label":  "B"
                                }
                            ],
                            "answer": [
                                {
                                    "content":  "$$\\frac{{{x}^{2}}-36}{2x+12}$$  88  <br>",
                                    "is_right":  "0",
                                    "label":  "A"
                                }
                            ],
                            "analyticAudio": [
                                {
                                  "key": "string",
                                  "value": "string"
                                }
                              ]
                    },
                    {
                            "id":  102644,
                            "stem":  "如图，$$AB\/\/CD$$，直线EF与AB，CD分别交于点M，N，过点N的直线GH与AB交于点P，则下列结论错误的是（　　）    <br>\n<img  src=\"http:\/\/xesfile.mangoya.com\/resource\/tmp\/test_library\/img\/2018\/01\/31\/t_100637_1_2841x3922.jpg?1517366062\">    <br>",
                            "type":  2,
                            "choiceType":  1,
                            "materialId":  0,
                            "serialNum":  0,
                            "categoryId":  0,
                            "audio":  [],
                            "module": '数',
                            "right":  false,
                            "analysis":  "<img  src=\"http:\/\/xesfile.mangoya.com\/resource\/tmp\/test_library\/img\/2018\/01\/31\/t_100637_2_2841x3838.jpg?1517366096\">  A、∵$$AB\/\/CD$$，    <br>\n∴$$\\angle  EMB=\\angle  END$$（两直线平行，同位角相等）；    <br>\nB、∵$$AB\/\/CD$$，    <br>\n∴$$\\angle  BMN=\\angle  MNC$$（两直线平行，内错角相等）；    <br>\nC、∵$$AB\/\/CD$$，    <br>\n∴$$\\angle  CNH=\\angle  MPN$$（两直线平行，同位角相等），    <br>\n∵$$\\angle  MPN=\\angle  BPG$$（对顶角），    <br>\n∴$$\ \angle CNH=\\angle BPG$$（等量代换）；  <br>\nD、$$\\angle DNG$$与$$\\angle AME$$没有关系，  <br>\n无法判定其相等．  <br>\n故选D．  <br>\n考点：平行线的性质．  <br>\n2016年山东省滨州市中考数学试卷2",
        
                "stuAnswer": [
                    {
                        "content":  "$$\\frac{{{x}^{2}}-36}{2x+12}$$   05 <br>",
                        "is_right":  "0",
                        "label":  "C"
                    }
                ],
                "answer": [
                    {
                        "content":  "$$\\frac{{{x}^{2}}-36}{2x+12}$$ 02   <br>",
                        "is_right":  "0",
                        "label":  "A"
                    }
                ],
                "analyticAudio": [
                    {
                      "key": "string",
                      "value": "string"
                    }
                  ]
            },
            {
                "id": 100638,
                "stem": "$$-{{1}^{2}}$$等于（　　） 第一张图片<img src=\"http:\/\/xesfile.mangoya.com\/resource\/tmp\/test_library\/img\/2018\/01\/30\/t_100638_1_711x524.png?1517318946\">，第二张图片 <img src=\"http:\/\/xesfile.mangoya.com\/resource\/tmp\/test_library\/img\/2018\/01\/30\/t_100638_1_1096x873.jpg?1517318945\">，第三张图片 <img src=\"http:\/\/xesfile.mangoya.com\/resource\/tmp\/test_library\/img\/2018\/01\/30\/t_100638_5_776x833.jpg?1517318946\"> <br>",
                "type": 2,
                "choiceType": 1,
                "materialId": 0,
                "serialNum": 0,
                "categoryId": 0,
                "audio": [],
                "module": '数',
                "right": true,
                "analysis": "$$-{{1}^{2}}=-1$$，  <br>\n故选：B．  <br>\n第一张图片<img src=\"http:\/\/xesfile.mangoya.com\/resource\/tmp\/test_library\/img\/2018\/01\/30\/t_100638_1_711x524.png?1517318946\">，第二张图片 <img src=\"http:\/\/xesfile.mangoya.com\/resource\/tmp\/test_library\/img\/2018\/01\/30\/t_100638_1_1096x873.jpg?1517318945\">，第三张图片 <img src=\"http:\/\/xesfile.mangoya.com\/resource\/tmp\/test_library\/img\/2018\/01\/30\/t_100638_5_776x833.jpg?1517318946\"> \n考点：有理数的乘方．$$$$   <br>\n2016年山东省滨州市中考数学试卷1",
                "stuAnswer": [
                    {
                        "content":  "$$\\frac{{{x}^{2}}-36}{2x+12}$$p <br>",
                        "is_right":  "0",
                        "label":  "E"
                    }
                ],
                "answer": [
                    {
                        "content":  "$$\\frac{{{x}^{2}}-36}{2x+12}$$ sdfg <br>",
                        "is_right":  "0",
                        "label":  "A"
                    }
                ],
                "analyticAudio": [
                    {
                      "key": "string",
                      "value": "string"
                    }
                  ]
            },
            {
                "id": 130934,
                "stem": "What animals does the man like?",
                "type": 2,
                "choiceType": 1,
                "materialId": 0,
                "serialNum": 0,
                "categoryId": 0,
                "audio": [
                    {
                        "key": "111.mp3",
                        "value": "http:\/\/xes01.mangoya.com\/test_library\/audio\/2018\/06\/26\/t_130896_111.mp3?1530005870"
                    }
                ],
                "module": '数',
                "right": false,
                "analysis": "",
                "stuAnswer": [
                    {
                        "content":  "$$\\frac{{{x}^{2}}-36}{2x+12}$$ 12sf<br>",
                        "is_right":  "0",
                        "label":  "F"
                    }
                ],
                "answer": [
                    {
                        "content":  "$$\\frac{{{x}^{2}}-36}{2x+12}$$ 4fsdb <br>",
                        "is_right":  "0",
                        "label":  "A"
                    }
                ],
                "analyticAudio": [
                    {
                      "key": "string",
                      "value": "string"
                    }
                  ]
            }
        ],
        "materialList": []
    },
    {
        "name": "二、填空题",
        "testNum": 3,
        "description": "10分",
        "id": 1422,
        "testLists": [
            {
                "id": 100624,
                "stem": "如图，矩形ABCD中，$$AB=\\sqrt{3}$$，$$BC=\\sqrt{6}$$，点E在对角线BD上，且$$BE=1.8$$，连接AE并延长交DC于点F，则$$\\frac{CF}{CD}=$$<span class='test_blank' style='width:96'px'>&nbsp;<\/span>.  <br>\n<img src=\"http:\/\/xesfile.mangoya.com\/resource\/tmp\/test_library\/img\/2018\/01\/31\/t_100624_15_862x589.png?1517368255\">  <br>",
                "type": 1,
                "choiceType": 0,
                "materialId": 0,
                "serialNum": 0,
                "categoryId": 0,
                "audio": [
                    {
                        "key": "2.mp3",
                        "value": "http:\/\/xes01.mangoya.com\/test_library\/audio\/2017\/12\/07\/t_20990_2.mp3?1512649989"
                    }
                ],
                "module": '数',
                "right": true,
                "analysis": "∵四边形ABCD是矩形，  <br>\n∴$$\\angle BAD=90{}^\\circ $$，又$$AB=\\sqrt{3}$$，$$BC=\\sqrt{6}$$，  <br>\n∴$$BD=\\sqrt{A{{B}^{2}}+A{{D}^{2}}}=3$$，  <br>\n∵$$BE=1.8$$，  <br>\n∴$$DE=3-1.8=1.2$$，  <br>\n∵$$AB\/\/CD$$，  <br>\n∴$$\\frac{DF}{AB}=\\frac{DE}{BE}$$，即$$\\frac{DF}{\\sqrt{3}}=\\frac{1.2}{1.8}$$，  <br>\n解得，$$DF=\\frac{2\\sqrt{3}}{3}$$，  <br>\n则$$CF=CD-DF=\\frac{\\sqrt{3}}{3}$$，  <br>\n∴$$\\frac{CF}{CD}=\\frac{\\frac{\\sqrt{3}}{3}}{\\sqrt{3}}=\\frac{1}{3}$$，  <br>\n考点：相似三角形的判定与性质；矩形的性质．  <br>\n2016年山东省滨州市中考数学试卷15",              
                "stuAnswer": [
                    {
                        "content":  "$$\\frac{{{x}^{2}}-36}{2x+12}$$ ",   
                        "right": true                   
                    }
                ],
                "answer": [
                    {
                        "content":  "$$\\frac{{{x}^{2}}-36}{2x+12}$$"                
                    }
                ],
                "analyticAudio": [
                    {
                      "key": "string",
                      "value": "string"
                    }
                  ]
            },
            {
                "id": 130939,
                "stem": "Where is Lily's mother?",
                "type": 4,
                "choiceType": 0,
                "materialId": 0,
                "serialNum": 0,
                "categoryId": 0,
                "audio": [
                    {
                        "key": "2.mp3",
                        "value": "http:\/\/xes01.mangoya.com\/test_library\/audio\/2017\/12\/07\/t_20990_2.mp3?1512649989"
                    },
                    {
                        "key": "425.mp3",
                        "value": "http:\/\/xes04.mangoya.com\/test_library\/audio\/2018\/06\/27\/t_130939_425.mp3?1530084423"
                    }
                ],
                "module": '数',
                "right": true,
                "analysis": "M: How are you, Lily?\nW: I'm fine, thank you\nM: How's your mother?\nW: She's in hospital.\nM: I'm sorry to hear that. Which hospital is she in?\nW: She's in No. 3 People's Hospital.\nM: How is your father?\nW: He is fine. He is looking after my mother in the hospital.\nM: I want to see your mother after school with my best friend Peter.\nW: Thank you very much.\nM: You're welcome.\n",
                "stuAnswer": [
                    {
                        "content":  "$$\\frac{{{x}^{2}}-36}{2x+12}$$ DFDF",
                        "right": true                               
                    }
                ],
                "answer": [
                    {
                        "content":  "$$\\frac{{{x}^{2}}-36}{2x+12}$$SDFSDF"                
                    }
                ],
                "analyticAudio": [
                    {
                      "key": "string",
                      "value": "string"
                    }
                  ]
            }
        ],
        "materialList": [
            {
                "content": null,
                "audio": "",
                "testLists": [
                    {
                        "id": 20990,
                        "stem": "HE BOSS: Can she type this letter for me?",
                        "type": 4,
                        "choiceType": 0,
                        "materialId": 50037,
                        "serialNum": 127,
                        "categoryId": 0,
                        "audio": [
                            {
                                "key": "2.mp3",
                                "value": "http:\/\/xes01.mangoya.com\/test_library\/audio\/2017\/12\/07\/t_20990_2.mp3?1512649989"
                            }
                        ],
                        "module": '数',
                        "right": true,
                        "analysis": "oikujhytgfd",
                        "stuAnswer": [
                            {
                                "content":  "$$\\frac{{{x}^{2}}-36}{2x+12}$$ 4545",
                                "right": true                                  
                            }
                        ],
                        "answer": [
                            {
                                "content":  "$$\\frac{{{x}^{2}}-36}{2x+12}$$  8888"                
                            }
                        ],
                        "analyticAudio": [
                            {
                              "key": "string",
                              "value": "string"
                            }
                          ]
                    },
                    {
                        "id": 20992,
                        "stem": "HE BOSS: Can she type this letter for me?",
                        "type": 4,
                        "choiceType": 0,
                        "materialId": 50037,
                        "serialNum": 127,
                        "categoryId": 0,
                        "audio": [
                            {
                                "key": "2.mp3",
                                "value": "http:\/\/xes01.mangoya.com\/test_library\/audio\/2017\/12\/07\/t_20990_2.mp3?1512649989"
                            }
                        ],
                        "module": '数',
                        "right": true,
                        "analysis": "oikujhytgfd",
                        "stuAnswer": [
                            {
                                "content":  "$$\\frac{{{x}^{2}}-36}{2x+12}$$ 4545",
                                "right": true                                   
                            }
                        ],
                        "answer": [
                            {
                                "content":  "$$\\frac{{{x}^{2}}-36}{2x+12}$$  8888"                
                            }
                        ],
                        "analyticAudio": [
                            {
                              "key": "string",
                              "value": "string"
                            }
                          ]
                    }
                ]
            }
        ]
    },
    {
        "name": "三、材料题",
        "testNum": 2,
        "description": "20分",
        "id": 1423,
        "testLists": [],
        "materialList": [
            {
                "content": '材料题题目$$\\frac{{{x}^{2}}-36}{2x+12}$$ DFGDSG',
                "audio": "",
                "testLists": [
                    {
                        "id": 100875,
                        "stem": "<span class='test_blank' style='width:60'px'>&nbsp;<\/span>写这篇文章的目的是什么？<span class='test_blank' style='width:60'px'>&nbsp;<\/span>是否听从了诸葛亮的话？先帝的名字叫<span class='test_blank' style='width:60'px'>&nbsp;<\/span>",
                        "type": 1,
                        "choiceType": 0,
                        "materialId": 50184,
                        "serialNum": 127,
                        "categoryId": 0,
                        "audio": [],
                        "module": '数',
                        "right": true,
                        "analysis": "多读读三国吧，亲！",
                        "stuAnswer": [
                            {
                                "content":  "$$\\frac{{{x}^{2}}-36}{2x+12}$$ DFGDSG   <br>",
                                "right": true                                   
                            }
                        ],
                        "answer": [
                            {
                                "content":  "$$\\frac{{{x}^{2}}-36}{2x+12}$$  45G  <br>",
                                "right": true                             
                            }
                        ],
                        "analyticAudio": [
                            {
                              "key": "string",
                              "value": "string"
                            }
                          ]
                    }
                ]
            },
            {
                "content": null,
                "audio": "",
                "testLists": [
                    {
                        "id": 101162,
                        "stem": "改编自100617 若$$\\tan \\angle FBC=\\frac{3}{4}$$，$$DF=\\sqrt{5}$$，求EF的长．  <br>",
                        "type": 1,
                        "choiceType": 0,
                        "materialId": 50183,
                        "serialNum": 1,
                        "categoryId": 0,
                        "audio": [],
                        "right": true,
                        "module": '数',
                        "analysis": "连接EF，  <br>\n∵$$\\angle C=90{}^\\circ $$，  <br>\n∴BF是$$\\odot O$$的直径，  <br>\n∴$$\\angle BEF=90{}^\\circ $$，  <br>\n∴四边形BCFE是矩形，  <br>\n∴$$EF=BC$$，  <br>\n∵$$AB\/\/OP\/\/CD$$，$$BO=FO$$，  <br>\n∴$$OP=\\frac{1}{2}AD=\\frac{1}{2}CD$$，  <br>\n∵$$P{{D}^{2}}=DF\\cdot CD$$，即$${{\\left( \\frac{1}{2CD} \\right)}^{2}}=\\sqrt{5}\\cdot CD$$，  <br>\n∴$$CD=4\\sqrt{5}$$，  <br>\n∴$$EF=BC=4\\sqrt{5}$$．  <br>\n考点：切线的性质；正方形的性质．  <br>\n2016年山东省滨州市中考数学试卷21",
                        "stuAnswer": [
                            {
                                "content":  "$$\\frac{{{x}^{2}}-36}{2x+12}$$ DFYG4   <br>" ,
                                "right": true                                  
                            }
                        ],
                        "answer": [
                            {
                                "content":  "$$\\frac{{{x}^{2}}-36}{2x+12}$$FH4H    <br>",
                                "right": true                             
                            }
                        ],
                        "analyticAudio": [
                            {
                              "key": "string",
                              "value": "string"
                            }
                          ]
                    }
                ]
            }
        ]
    }
]}   
})

// 推荐课程 /exam/recommendCourse/{recordId}
Mock.mock(/exam\/recommendCourse\/([\w|\?\S*]+)$/, 'get', {
    "code": 0,
    "msg": "",
    "data": [
        {
            "id": "39913",
            "name": "随堂测课程",
            "secondTitle": "",
            "schoolTimeName": "",
            "isQuality": 1, // isQuality 为1时， 为素养课
            "courseType": 1, // 字段用courseType 区分，   为1是直播，  2为录播 学期不展示之前的，  展示 录播 或者直播
            "syllabusNum": "50",
            "subjects": [
                {
                    "id": "3",
                    "name": "英"
                }
            ],
            "terms": [
                {
                    "name": "spring",
                    "closest": true
                },
                {
                    "name": "summer",
                    "closest": false
                },
                {
                    "name": "autumn",
                    "closest": false
                },
                {
                    "name": "winter",
                    "closest": false
                },
                {
                    "name": "year",
                    "closest": false
                }
            ],
            "isHaveCounselorTeacher": 1,
            "chineseTeacher": [],
            "foreignTeacher": [
                {
                    "id": "1492",
                    "name": "徐琛主播",
                    "typeName": "授课",
                    "avatars": [
                        "https://xesfile.mangoya.com/teacher/2016/08/18/14715067997065.jpg"
                    ]
                }
            ],
            "class": {
                "id": "11828",
                "counselor": {
                    "id": "1441",
                    "typeName": "辅导",
                    "name": "徐琛辅讲",
                    "avatars": [
                        "https://xesfile.mangoya.com/web/2017/11/22/15113382042886.png"
                    ],
                    "leftNum": 16
                }
            },
            "price": {
                "origin": "50",
                "resale": 50
            },
            "saletimes": {
                "haleSaleTime": "2018-08-31 23:59:59",
                "countDown": "距离课程停售还剩2天"
            },
            "difficulty": {
                "id": "78",
                "name": 3,
                "alias": 3
            }
        },
        {
            "id": "38916",
            "name": "课程-调换场次二包一",
            "secondTitle": "",
            "schoolTimeName": "",
            "syllabusNum": "30",
            "subjects": [
                {
                    "id": "3",
                    "name": "英"
                }
            ],
            "terms": [
                {
                    "name": "spring",
                    "closest": true
                },
                {
                    "name": "summer",
                    "closest": false
                },
                {
                    "name": "autumn",
                    "closest": false
                },
                {
                    "name": "winter",
                    "closest": false
                },
                {
                    "name": "year",
                    "closest": false
                }
            ],
            "isHaveCounselorTeacher": 0,
            "chineseTeacher": [
                {
                    "id": "1432",
                    "name": "徐琛授课",
                    "typeName": "授课",
                    "avatars": [
                        "https://xesfile.mangoya.com/teacher/2017/11/13/15105528833931.jpg"
                    ]
                }
            ],
            "foreignTeacher": [
                {
                    "id": "1492",
                    "name": "徐琛主播",
                    "typeName": "授课",
                    "avatars": [
                        "https://xesfile.mangoya.com/teacher/2016/08/18/14715067997065.jpg"
                    ]
                }
            ],
            "class": {
                "id": "10312",
                "counselor": {
                    "id": "2115",
                    "typeName": "",
                    "name": "",
                    "avatars": [
                        ""
                    ],
                    "leftNum": 8
                }
            },
            "price": {
                "origin": "1",
                "resale": 1
            },
            "saletimes": {
                "haleSaleTime": "2018-10-31 23:59:59",
                "countDown": ""
            },
            "difficulty": {
                "id": "78",
                "name": 3,
                "alias": 3
            }
        },
        {
            "id": "38919",
            "name": "课程-调换场次二包一",
            "secondTitle": "啦啦啦啦啦啦",
            "schoolTimeName": "上课时间描述",
            "syllabusNum": "30",
            "subjects": [
                {
                    "id": "3",
                    "name": "英"
                }
            ],
            "terms": [
                {
                    "name": "spring",
                    "closest": true
                },
                {
                    "name": "summer",
                    "closest": false
                },
                {
                    "name": "autumn",
                    "closest": false
                },
                {
                    "name": "winter",
                    "closest": false
                },
                {
                    "name": "year",
                    "closest": false
                }
            ],
            "isHaveCounselorTeacher": 0,
            "chineseTeacher": [
                {
                    "id": "1432",
                    "name": "徐琛授课",
                    "typeName": "授课",
                    "avatars": [
                        "https://xesfile.mangoya.com/teacher/2017/11/13/15105528833931.jpg"
                    ]
                }
            ],
            "foreignTeacher": [
                {
                    "id": "1492",
                    "name": "徐琛主播",
                    "typeName": "授课",
                    "avatars": [
                        "https://xesfile.mangoya.com/teacher/2016/08/18/14715067997065.jpg"
                    ]
                }
            ],
            "class": {
                "id": "10312",
                "counselor": {
                    "id": "2115",
                    "typeName": "",
                    "name": "",
                    "avatars": [
                        ""
                    ],
                    "leftNum": 8
                }
            },
            "price": {
                "origin": "1",
                "resale": 1
            },
            "saletimes": {
                "haleSaleTime": "2018-10-31 23:59:59",
                "countDown": ""
            },
            "difficulty": {
                "id": "78",
                "name": 3,
                "alias": 3
            }
        },
        {
            "id": "38910",
            "name": "课程-调换场次二包一",
            "secondTitle": "",
            "schoolTimeName": "",
            "syllabusNum": "30",
            "subjects": [
                {
                    "id": "3",
                    "name": "英"
                }
            ],
            "terms": [
                {
                    "name": "spring",
                    "closest": true
                },
                {
                    "name": "summer",
                    "closest": false
                },
                {
                    "name": "autumn",
                    "closest": false
                },
                {
                    "name": "winter",
                    "closest": false
                },
                {
                    "name": "year",
                    "closest": false
                }
            ],
            "isHaveCounselorTeacher": 0,
            "chineseTeacher": [
                {
                    "id": "1432",
                    "name": "徐琛授课",
                    "typeName": "授课",
                    "avatars": [
                        "https://xesfile.mangoya.com/teacher/2017/11/13/15105528833931.jpg"
                    ]
                }
            ],
            "foreignTeacher": [
                {
                    "id": "1492",
                    "name": "徐琛主播",
                    "typeName": "授课",
                    "avatars": [
                        "https://xesfile.mangoya.com/teacher/2016/08/18/14715067997065.jpg"
                    ]
                }
            ],
            "class": {
                "id": "10312",
                "counselor": {
                    "id": "2115",
                    "typeName": "",
                    "name": "",
                    "avatars": [
                        ""
                    ],
                    "leftNum": 8
                }
            },
            "price": {
                "origin": "1",
                "resale": 1
            },
            "saletimes": {
                "haleSaleTime": "2018-10-31 23:59:59",
                "countDown": ""
            },
            "difficulty": {
                "id": "78",
                "name": 3,
                "alias": 3
            }
        },
        {
            "id": "38912",
            "name": "课程-调换场次二包一",
            "secondTitle": "啦啦啦啦啦啦",
            "schoolTimeName": "上课时间描述",
            "syllabusNum": "30",
            "subjects": [
                {
                    "id": "3",
                    "name": "英"
                }
            ],
            "terms": [
                {
                    "name": "spring",
                    "closest": true
                },
                {
                    "name": "summer",
                    "closest": false
                },
                {
                    "name": "autumn",
                    "closest": false
                },
                {
                    "name": "winter",
                    "closest": false
                },
                {
                    "name": "year",
                    "closest": false
                }
            ],
            "isHaveCounselorTeacher": 0,
            "chineseTeacher": [
                {
                    "id": "1432",
                    "name": "徐琛授课",
                    "typeName": "授课",
                    "avatars": [
                        "https://xesfile.mangoya.com/teacher/2017/11/13/15105528833931.jpg"
                    ]
                }
            ],
            "foreignTeacher": [
                {
                    "id": "1492",
                    "name": "徐琛主播",
                    "typeName": "授课",
                    "avatars": [
                        "https://xesfile.mangoya.com/teacher/2016/08/18/14715067997065.jpg"
                    ]
                }
            ],
            "class": {
                "id": "10312",
                "counselor": {
                    "id": "2115",
                    "typeName": "",
                    "name": "",
                    "avatars": [
                        ""
                    ],
                    "leftNum": 8
                }
            },
            "price": {
                "origin": "1",
                "resale": 1
            },
            "saletimes": {
                "haleSaleTime": "2018-10-31 23:59:59",
                "countDown": ""
            },
            "difficulty": {
                "id": "78",
                "name": 3,
                "alias": 3
            }
        }
    ]
})

// 说明页——————————————————————————————————————
// 诊断说明页，包含开始时间、结束时间、分数线等数据 /exam/diagnosisDescription/{examId}
Mock.mock(/exam\/diagnosisDescription\/([\w|\?\S*]+)$/, 'get', () => {
    var data = [{
        code: 0,
        msg: 'string',
        data: {
            'description': `1.只有一次诊断机会，请认真答题； 根据诊断结果判断你是否具有本课程报名资格 或给出报名建议；根据诊断结果判断你是否具有本课程报名资格 或给出报名建议；根据诊断结果判断你是否具有本课程报名资格 或给出报名建议；、\n
2.诊断一旦开始不可暂停，请提前做好准备；\n
3.交卷后即可查看测试结果； \n
4.系统将根据诊断结果判断你是否具有本课程报名资格 或给出报名建议； \n
5.选择适合自己的课程才能有最好的辅导效果，请独立作答。`,
            'examName': '2018新初二教学实验班入学诊断',
            'examLongTime': 60,
            'startTime': '2018-06-02 8:30',
            'endTime': '2018-06-02 19:30',
            'totalPoints': '100',
            'scoreSection': [
                {
                    'score': 40,
                    'name': '目标班'
                }, {
                    'score': 60,
                    'name': '目标班'
                }, {
                    'score': 70,
                    'name': '目标班'
                }, {
                    'score': 80,
                    'name': '目标班'
                }, {
                    'score': 100,
                    'name': '目标班'
                }
            ]
        }
    }, {
        code: 1001,
        msg: '该诊断已过期',
        data: {
            'examName': '2018新初二教学实验班入学诊断'
        }
    }, {
        code: 1002,
        msg: '该诊断将在2018-06-02 19:30开始\n请耐心等待',
        data: {
            'examName': '2018新初二教学实验班入学诊断'
        }
    }]
    // console.log(Math.floor(Math.random()*3))
    // return data[Math.floor(Math.random()*3)]
    return data[0]    
})

// 考试页 ————————————————————————————————————
// 题目作答页，返回所有题目数据 /exam/examPaper/{examId}
Mock.mock(/exam\/examPaper\/([\w|\?\S*]+)$/, 'get', {
    'code': 0,
    'msg': 'success',
    "data":  {
        "description":  "",
        "endTime":  "2018-09-01 01:01:01",
        "entranceTime": '2018-09-03 13:50:01',
        "examId":  "0229d4d9b9be77405aa6619279ea5d5e9",
        "examName":  "还有错吗",
        "examLink":  "http://exam.mangoya.com/OpenExamination/entrance/0229d4d9b9be77405aa6619279ea5d5e9",
        "startTime":  "2018-08-22  19:52:00",
        "paperId":  534,
        "score":  "20",
        "paperTime":  90,
        "segment":  [{
            "name":  "一、选择题",
            "testNum":  4,
            "description":  "3分每题",
            "id":  1421,
            "testLists":  [
                    {
                        "id":  102642,
                        "stem":  "下列分式中，最简分式是（　　）    <br>",
                        "type":  2,
                        "choiceType":  1,
                        "materialId":  0,
                        "serialNum":  0,
                        "categoryId":  0,
                        "audio":  [],
                        "optionNum":  4,
                        "option":  [
                                {
                                        "content":  "$$\\frac{{{x}^{2}}-1}{{{x}^{2}}+1}$$    <br>",
                                        "is_right":  "1",
                                        "label":  "A"
                                },
                                {
                                        "content":  "$$\\frac{x+1}{{{x}^{2}}-1}$$    <br>",
                                        "is_right":  "0",
                                        "label":  "B"
                                },
                                {
                                        "content":  "$$\\frac{{{x}^{2}}-2xy+{{y}^{2}}}{{{x}^{2}}-xy}$$    <br>",
                                        "is_right":  "0",
                                        "label":  "C"
                                },
                                {
                                        "content":  "$$\\frac{{{x}^{2}}-36}{2x+12}$$    <br>",
                                        "is_right":  "0",
                                        "label":  "D"
                                }
                        ]
                    },
                    {
                            "id":  102644,
                            "stem":  "如图，$$AB//CD$$，直线EF与AB，CD分别交于点M，N，过点N的直线GH与AB交于点P，则下列结论错误的是（　　）    <br>\n<img  src=\"http://xesfile.mangoya.com/resource/tmp/test_library/img/2018/01/31/t_100637_1_2841x3922.jpg?1517366062\">    <br>",
                            "type":  2,
                            "choiceType":  1,
                            "materialId":  0,
                            "serialNum":  0,
                            "categoryId":  0,
                            "audio":  [],
                            "optionNum":  4,
                            "option":  [
                                {
                                        "content":  "$$\\angle  EMB=\\angle  END$$    <br>",
                                        "is_right":  "0",
                                        "label":  "A"
                                },
                                {
                                        "content":  "$$\\angle  BMN=\\angle  MN C$$  <br>",
                                    "is_right": "0",
                                    "label": "B"
                                },
                                {
                                    "content": "$$\\angle CNH=\\angle BPG$$  <br>",
                                    "is_right": "0",
                                    "label": "C"
                                },
                                {
                                    "content": "$$\\angle DNG=\\angle AME$$  <br>",
                                    "is_right": "1",
                                    "label": "D"
                                }
                            ]
                    },
                    {
                        "id": 100638,
                        "stem": "$$-{{1}^{2}}$$等于（　　） 第一张图片<img src=\"http://xesfile.mangoya.com/resource/tmp/test_library/img/2018/01/30/t_100638_1_711x524.png?1517318946\">，第二张图片 <img src=\"http://xesfile.mangoya.com/resource/tmp/test_library/img/2018/01/30/t_100638_1_1096x873.jpg?1517318945\">，第三张图片 <img src=\"http://xesfile.mangoya.com/resource/tmp/test_library/img/2018/01/30/t_100638_5_776x833.jpg?1517318946\"> <br>",
                        "type": 2,
                        "choiceType": 1,
                        "materialId": 0,
                        "serialNum": 0,
                        "categoryId": 0,
                        "audio": [],
                        "optionNum": 4,
                        "option": [
                            {
                                "content": "1 第一张图片<img src=\"http://xesfile.mangoya.com/resource/tmp/test_library/img/2018/01/30/t_100638_1_711x524.png?1517318946\"><br>",
                                "is_right": "0",
                                "label": "A"
                            },
                            {
                                "content": "$$-1$$ 第二张图片 <img src=\"http://xesfile.mangoya.com/resource/tmp/test_library/img/2018/01/30/t_100638_1_1096x873.jpg?1517318945\">  <br>",
                                "is_right": "1",
                                "label": "B"
                            },
                            {
                                "content": "2第三张图片 <img src=\"http://xesfile.mangoya.com/resource/tmp/test_library/img/2018/01/30/t_100638_5_776x833.jpg?1517318946\">   <br>",
                                "is_right": "0",
                                "label": "C"
                            },
                            {
                                "content": "$$-2$$  <br>",
                                "is_right": "0",
                                "label": "D"
                            }
                        ]
                    },
                    {
                        "id": 130934,
                        "stem": "What animals does the man like?",
                        "type": 2,
                        "choiceType": 1,
                        "materialId": 0,
                        "serialNum": 0,
                        "categoryId": 0,
                        "audio": [
                            {
                                "key": "111.mp3",
                                "value": "http://xes01.mangoya.com/test_library/audio/2018/06/26/t_130896_111.mp3?1530005870"
                            }
                        ],
                        "optionNum": 3,
                        "option": [
                            {
                                "content": "Koalas. ",
                                "is_right": "0",
                                "label": "A"
                            },
                            {
                                "content": "Dolphins. ",
                                "is_right": "0",
                                "label": "B"
                            },
                            {
                                "content": " Elephants.",
                                "is_right": "1",
                                "label": "C"
                            }
                        ]
                    }
                ],
                "materialList": []
            },
            {
                "name": "二、填空题",
                "testNum": 3,
                "description": "10分",
                "id": 1422,
                "testLists": [
                    {
                        "id": 100600,
                        "stem": "如图，矩形ABCD中，$$AB=\\sqrt{3}$$，$$BC=\\sqrt{6}$$，点E在对角线BD上，且$$BE=1.8$$，连接AE并延长交DC于点F，则$$\\frac{CF}{CD}=$$<span class='test_blank' style='width:96'px'>&nbsp;</span>.  <br>\n<img src=\"http://xesfile.mangoya.com/resource/tmp/test_library/img/2018/01/31/t_100624_15_862x589.png?1517368255\">  <br>",
                        "type": 1,
                        "choiceType": 0,
                        "materialId": 0,
                        "serialNum": 0,
                        "categoryId": 0,
                        "audio": [
                            {
                                "key": "2.mp3",
                                "value": "http://xes03.mangoya.com/test_library/audio/2017/12/07/t_20990_2.mp3?1512649989"
                            }
                        ],
                        "optionNum": 0,
                        "option": [
                            {
                                "content": "$$\\frac{1}{3}$$"
                            },
                            {
                                "content": "  <br>"
                            }
                        ]
                    },
                    {
                        "id": 130222,
                        "stem": "Where is Lily's mother?",
                        "type": 1,
                        "choiceType": 0,
                        "materialId": 0,
                        "serialNum": 0,
                        "categoryId": 0,
                        "audio": [
                            {
                                "key": "2.mp3",
                                "value": "http://xes03.mangoya.com/test_library/audio/2017/12/07/t_20990_2.mp3?1512649989"
                            },
                            {
                                "key": "425.mp3",
                                "value": "http://xes02.mangoya.com/test_library/audio/2018/06/27/t_130939_425.mp3?1530084423"
                            }
                        ],
                        "optionNum": 0,
                        "option": [
                            {
                                "content": "In hospital"
                            }
                        ]
                    }
                ],
                "materialList": [
                    {
                        "content": '材料题题目',
                        "audio": "",
                        "testLists": [
                            {
                                "id": 20990,
                                "stem": "HE BOSS: Can she type this letter for me?",
                                "type": 1,
                                "choiceType": 0,
                                "materialId": 50037,
                                "serialNum": 127,
                                "categoryId": 0,
                                "audio": [
                                    {
                                        "key": "2.mp3",
                                        "value": "http://xes03.mangoya.com/test_library/audio/2017/12/07/t_20990_2.mp3?1512649989"
                                    }
                                ],
                                "optionNum": 0,
                                "option": [
                                    {
                                        "content": "Can she type this letter for me?"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "name": "三、材料题",
                "testNum": 2,
                "description": "20分",
                "id": 1423,
                "testLists": [],
                "materialList": [
                    {
                        "content": '材料题题目',
                        "audio": "",
                        "testLists": [
                            {
                                "id": 100875,
                                "stem": "<span class='test_blank' style='width:60'px'>&nbsp;</span>写这篇文章的目的是什么？<span class='test_blank' style='width:60'px'>&nbsp;</span>是否听从了诸葛亮的话？先帝的名字叫<span class='test_blank' style='width:60'px'>&nbsp;</span>",
                                "type": 1,
                                "choiceType": 0,
                                "materialId": 50184,
                                "serialNum": 127,
                                "categoryId": 0,
                                "audio": [],
                                "optionNum": 0,
                                "option": [
                                    {
                                        "content": "诸葛亮"
                                    },
                                    {
                                        "content": "刘禅"
                                    },
                                    {
                                        "content": "刘备"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "content": '材料题题目',
                        "audio": "",
                        "testLists": [
                            {
                                "id": 101162,
                                "stem": "改编自100617 若$$\\tan \\angle FBC=\\frac{3}{4}$$，$$DF=\\sqrt{5}$$，求EF的长．  <br>",
                                "type": 1,
                                "choiceType": 0,
                                "materialId": 50183,
                                "serialNum": 1,
                                "categoryId": 0,
                                "audio": [],
                                "optionNum": 0,
                                "option": [
                                    {
                                        "content": "$$4\\sqrt{5}$$"
                                    },
                                    {
                                        "content": "  <br>"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ],
        "stuInfo": {
            "stat": 1,
            "data": {
                "id": "2383369",
                "uid": "123472537",
                "name": "13123gty",
                "role": "1",
                "sex": "3",
                "realname": "",
                "nickname": "",
                "en_name": "",
                "avatar_path": "https://xesfile.mangoya.com/user/h/def10002.png",
                "avatar_version": "0",
                "auth": "1",
                "status": "1",
                "create_time": "2018-07-19 15:32:29",
                "user_id": "2383369",
                "grade_id": 13,
                "grade_name": "高三",
                "grade_alias": "gao3"
            }
        }
    }
})

// 提交试卷 /exam/submit/{examId}/{paperId}
Mock.mock(/exam\/submit\/([\w|\?\S*]+)\/([\w|\?\S*]+)/, 'post', {
    'code': 0,
    'msg': 'success',
    "data":  {
        recordId: 111
    }
})

// 搜索 Index/hotWords
Mock.mock('http://www.mangoya.com/Index/hotWords', 'post', {
    "status":1,
    "rows":1,
    "data": {
        "default":"\u76f4\u64ad",
        "hotwords":["50\u5143\u8bfe","\u521d\u4e2d\u51e0\u4f55","\u671f\u4e2d\u62a2\u5206"],"api_id":"1.1.2","searchHotWords":["\u7cbe\u8bfb","\u521d\u4e00\u7269\u7406","\u81ea\u62fc&\u97f3\u6807\u8bfe"]
    }
})
