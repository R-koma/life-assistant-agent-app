export default function LandingPage() {
  return (
    <div>
      {/* ---------------- Hero Section ---------------- */}
      <section className="relative flex flex-col items-center text-center py-28 px-6 bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 leading-tight max-w-3xl">
          あなたの学習と生活を
          <span className="text-indigo-600 dark:text-indigo-400">
            {" "}
            "自動運転"{" "}
          </span>
          にするパーソナルAIコーチ
        </h1>

        <p className="text-gray-600 dark:text-gray-300 text-lg md:text-xl mt-6 max-w-2xl">
          学習計画、Todo整理、スケジュール管理、生活リズムの最適化まで。
          すべての「考える負担」を AI が引き受けます。
        </p>

        <div className="mt-10">
          <a
            href="/sign-up"
            className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white px-8 py-4 rounded-xl text-lg shadow-lg transition-colors"
          >
            今すぐ無料で始める
          </a>
        </div>
      </section>

      {/* ---------------- Problem Section ---------------- */}
      <section className="py-24 px-6 bg-white dark:bg-gray-900">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100">
          計画疲れが、あなたの成長を止めている
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
          何を・どれだけ・いつ・どの順番で進めるべきかを毎日判断し続けることは
          脳に大きな負担を与えます。そのストレスを AI が解消します。
        </p>
      </section>

      {/* ---------------- Features Section ---------------- */}
      <section className="py-24 px-6 bg-gray-50 dark:bg-gray-800">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-12">
          あなたのAIコーチが全てを最適化
        </h2>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {/* Feature 1 */}
          <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-md border border-transparent dark:border-gray-700">
            <h3 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
              AIロードマップ生成
            </h3>
            <p className="mt-3 text-gray-600 dark:text-gray-300">
              長期〜短期目標に基づき、最短距離で成長する計画をAIが作成。
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-md border border-transparent dark:border-gray-700">
            <h3 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
              Todo優先度AI
            </h3>
            <p className="mt-3 text-gray-600 dark:text-gray-300">
              Todoを自動整理。「今やるべきこと」だけに集中できます。
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-md border border-transparent dark:border-gray-700">
            <h3 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
              AIスケジューラ
            </h3>
            <p className="mt-3 text-gray-600 dark:text-gray-300">
              生活リズム・集中時間帯を学習し、最適な1日の予定を自動生成。
            </p>
          </div>
        </div>
      </section>

      {/* ---------------- Daily Review Section ---------------- */}
      <section className="py-24 px-6 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            毎日の振り返りを AI と一緒に
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-4">
            学習ログや行動データをAIが解析し、改善点や翌日の重点ポイントを提案。
          </p>
        </div>
      </section>

      {/* ---------------- Pricing Section ---------------- */}
      <section className="py-24 px-6 bg-gray-50 dark:bg-gray-800">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-12">
          プラン
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Free */}
          <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              Free
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              基本的なAI学習サポートを体験
            </p>
            <p className="text-4xl font-bold text-gray-900 dark:text-gray-100 mt-6">
              ¥0
            </p>
          </div>

          {/* Pro */}
          <div className="bg-indigo-600 dark:bg-indigo-500 text-white p-8 rounded-xl shadow-md scale-[1.03]">
            <h3 className="text-xl font-bold">Pro</h3>
            <p className="mt-2">AIスケジューラ + 専門AIをフル活用</p>
            <p className="text-4xl font-bold mt-6">¥1,480/月</p>
          </div>

          {/* Master */}
          <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              Master
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              全AIキャラ開放 + データ分析
            </p>
            <p className="text-4xl font-bold text-gray-900 dark:text-gray-100 mt-6">
              ¥2,980/月
            </p>
          </div>
        </div>
      </section>

      {/* ---------------- CTA Section ---------------- */}
      <section className="py-28 text-center bg-white dark:bg-gray-900">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
          今日から「成果の出る学習」を始めよう。
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mt-4">
          AIがあなたの学習と生活を丸ごとサポートします。
        </p>

        <a
          href="/sign-up"
          className="mt-10 inline-block bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white px-10 py-4 rounded-xl text-lg shadow-lg transition-colors"
        >
          無料で始める
        </a>
      </section>
    </div>
  );
}
