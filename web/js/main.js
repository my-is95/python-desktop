var add_billing_btn = document.getElementById('add_billing_btn');
var modal = document.getElementById('modal');
var registerBtn = document.getElementById('registerBtn');
var closeBtn = document.getElementById('closeBtn');

add_billing_btn.addEventListener('click', function() {
    modal.style.display = 'block';
})

registerBtn.addEventListener('click', function() {
    let profile_name = document.getElementsByName("profile_name")[0].value;
    let name = document.getElementsByName("name")[0].value;
    let email = document.getElementsByName("email")[0].value;

    // name="profile_id"を持っているタグのvalue値が空の場合は新規登録であると判断する, そうでない場合は編集
    if(document.getElementsByName("profile_id")[0].value == ""){
        eel.add_billing_to_profile_tbl(profile_name, name, email);
    }else{
        profile_id = document.getElementsByName("profile_id")[0].value;
        eel.edit_billing_to_profile_tbl(profile_id, profile_name, name, email);
    }
    document.getElementsByName("profile_id")[0].value = "";
    document.getElementsByName("profile_name")[0].value = "";
    document.getElementsByName("name")[0].value = "";
    document.getElementsByName("email")[0].value = "";
    display_billing();  // profileテーブルのレコードを再表示
    modal.style.display = 'none';
})

closeBtn.addEventListener('click', function() {
    modal.style.display = 'none';
})

window.addEventListener('click', function(e) {
    if (e.target == modal) {
        modal.style.display = 'none';
    }
});


function edit_billing_to_profile_tbl(e) {
    profile_id = this.id;
    console.log(profile_id + "　クリックされました！")
    document.getElementsByName("profile_id")[0].value = profile_id;
    let profile_list = eel.edit_billing_to_profile_tbl(profile_id);
    // document.getElementsByName("profile_name")[0].value = "";
    // document.getElementsByName("name")[0].value = "";
    // document.getElementsByName("email")[0].value = "";
    
}

// profileに登録されているレコードを表示する
async function display_billing() {
    document.getElementById("add_billing_tbody").innerHTML = "";
    let profile_lists = await eel.display_billing_from_profile_tbl()();
    for(let i=0; i<profile_lists.length; i++){
        profile_id = profile_lists[i][0];
        profile_name = profile_lists[i][1];
        _name = profile_lists[i][2];
        email = profile_lists[i][3];
        temp = "";
        temp += "<tr>";
        temp += `<td>${profile_name}</td>`;
        temp += `<td>${_name}</td>`;
        temp += `<td>${email}</td>`;
        temp += `<td>`
        // タスクに関連するボタンは、タスク処理状況により変化させる
        // temp += `<button class="run_btn"><i class="fas fa-play"></i></button>`
        temp += `<button class="edit_billing_btn"><i class="fas fa-pencil-alt"></i></button>`
        temp += `<button class="remove_billing_btn"><i class="far fa-trash-alt"></i></button></td>`
        temp += `</td>`
        temp += "</tr>";
        document.getElementById("add_billing_tbody").innerHTML += temp;
    }
    // 編集ボタン（えんぴつアイコン）が押されたとき、モーダルを表示し、既に登録済みのProfileを編集できるようにする
    const editElm = document.querySelectorAll('.edit_billing_btn');
    for(let i=0; i<profile_lists.length; i++){
        editElm[i].addEventListener('click', () => {
            document.getElementsByName("profile_id")[0].value = profile_lists[i][0];
            document.getElementsByName("profile_name")[0].value = profile_lists[i][1];
            document.getElementsByName("name")[0].value = profile_lists[i][2];
            document.getElementsByName("email")[0].value = profile_lists[i][3];
            modal.style.display = 'block';
        })
    }
    // 削除ボタン（ゴミ箱アイコン）が押されたとき、当該Profileを削除する
    const removeElm = document.querySelectorAll('.remove_billing_btn');
    for(let i=0; i<profile_lists.length; i++){
        removeElm[i].addEventListener('click', () => {
            console.log(profile_lists[i][0] + "　クリックされました！")
            eel.remove_billing_from_profile_tbl(profile_lists[i][0]);
            display_billing();  // 登録されているProfile一覧の表示
        });
    }

}

// 登録したprofileをすべて削除する
var remove_billing_btn = document.getElementById("remove_billing_btn");
remove_billing_btn.addEventListener('click', () => {
    eel.remove_all_billing_from_profile_tbl();
    display_billing();  // profileテーブルのレコードを再表示
})

// ↓main.jsが読み込まれた時に実行される↓
display_billing();


