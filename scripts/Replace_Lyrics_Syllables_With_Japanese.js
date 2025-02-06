// プラグイン関数
function getClientInfo() {
    return {
        "name" : SV.T("Replace Lyrics syllables With japanese"),
        "author" : "hikanashi",
        "versionNumber" : 0.01,
        "minEditorVersion" : 65537,
        "category" : "Lyrics"
    };
}

// 翻訳関数
function getTranslations(langCode) {
    if(langCode == "ja-jp") {
        return [
            ["Replace Lyrics syllables With japanese", "歌詞のシラブルを日本語に置き換える"],
        ];
    }
    return [];
}

function main() {
    // 変換表
    const syllableReplacementTable = [
        ["ah","あ"],
        ["sha","しゃ"],
        ["ta","た"],
        ["tat","たっ"],
        ["da","だ"],
        ["dat","だっ"],
        ["dut","だっ"],
        ["dan","だん"],
        ["na","な"],
        ["ha","は"],
        ["hah","は"],
        ["han","は"],
        ["fah","ふぁ"],
        ["ba","ば"],
        ["va","ば"],
        ["ban","ばん"],
        ["van","ばん"],
        ["pa","ぱ"],
        ["pat","ぱっ"],
        ["pan","ぱん"],
        ["paun","ぱん"],
        ["pam","ぱん"],
        ["la","ら"],
        ["ra","ら"],
        ["lat","らっ"],
        ["rat","らっ"],
        ["lan","らん"],
        ["ran","らん"],
        ["wa","わ"],
        ["wha","わ"],
        ["wah","わ"],
        ["wat","わっ"],
        ["what","わっ"],
        ["ya","や"],

        ["ih","ぃ"],
        ["yeah","いぇ"],
        ["wee","うぃ"],
        ["ti","てぃ"],
        ["di","でぃ"],
        ["li","り"],
        
        ["oo","う"],
        ["uh","う"],
        ["shu","しゅ"],
        ["to","とぅ"],
        ["tu","とぅ"],
        ["tut","とぅっ"],
        ["toot","とぅっ"],
        ["too","とぅ"],
        ["tm","とぅん"],
        ["tn","とぅん"],
        ["tun","とぅん"],
        ["tum","とぅん"],
        ["d","どぅっ"],
        ["do","どぅ"],
        ["du","どぅ"],
        ["doo","どぅ"],
        ["doot","どぅっ"],
        ["dm","どぅん"],
        ["dn","どぅん"],
        ["fu","ふ"],
        ["hoo","ふ"],
        ["lu","る"],
        ["ru","る"],
        ["loo","る"],
        ["lut","るっ"],
        ["rut","るっ"],
        ["loot","るっ"],
        ["lm","るん"],
        ["n","ん"],
        ["hn","ん"],
        ["hm","ん"],
        ["hun","ふん"],
        ["hum","ふん"],

        ["pe","ぺ"],
        ["hey","へい"],
        
        ["wo","うぉ"],
        ["woh","うぉ"],
        ["woo","うぉ"],
        ["wow","うぉぅ"],
        ["whoo","うぉ"],
        ["oh","お"],
        ["ohh","お"],
        ["ohi","おーぃ"],
        ["doh","どぉ"],
        ["fon","ふぉん"],
        ["fom","ふぉん"],
        ["ho","ほ"],
        ["pon","ぽん"],
        ["pom","ぽん"],
        ["pn","ぽん"],
        ["pm","ぽん"],
    
    ];


    var scope = SV.getMainEditor().getCurrentGroup();
    var noteGroup = scope.getTarget();
    changeLyricNoteGroup(noteGroup, syllableReplacementTable);

    // var project = SV.getProject();
    // var noteGroupNum = project.getNumNoteGroupsInLibrary();
    // for(var ng = 0; ng < noteGroupNum; ng++) {
    //     var noteGroup = project.getNoteGroup(ng);
    //     changeLyricNoteGroup(noteGroup, syllableReplacementTable);
    // }

    SV.finish();
}

// ノートグループ変換処理
// 変換処理を継続するならtrue
function changeLyricNoteGroup(noteGroup, replaceTable) {
    if(noteGroup === undefined) {
        conitunue;
    }

    for(var nidx = 0; nidx < noteGroup.getNumNotes(); nidx++) {
        var note = noteGroup.getNote(nidx);
        if(changeLyric(note, replaceTable) != true){
            break;
        }
    }
}


// シラブル変換処理
// 変換処理を継続するならtrue
function changeLyric(note, replaceTable) {

    var lyric = note.getLyrics();
    lyric = lyric.toLowerCase().replace(/(-|_|\(|\)|ー|―|‐|－|～|!|！)/, '');


    var changeValue = "";
    // シラブル置き換え対象外の場合は処理しない
    for(var i = 0; i < replaceTable.length; i++) {
        var target = replaceTable[i];

        if(target[0] == lyric) {
            changeValue = target[1];
            break; 
        }
    }

    if(changeValue.length < 1) {
        return true;
    }

    // シラブルで置き換える
    note.setLyrics(changeValue);
    note.setPhonemes("");
    return true;

}