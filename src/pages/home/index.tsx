import Footer from '@/components/footer';
import jiuxing from '@/assets/jiuxing.png';
import bazihehun from '@/assets/bazihehun.png';
import bazicesuan from '@/assets/bazicesuan.png';
import weilai from '@/assets/weilai.png';
import chengu from '@/assets/chengu.png';
import jiemeng from '@/assets/jiemeng.png';
import jiri from '@/assets/jiri.png';
import qiming from '@/assets/qiming.png';
import { useTitle } from 'ahooks';

const Home = () => {
  // 设置页面标题
  useTitle('星星命理 - 首页');

  return (
    <main className='flex flex-col'>
      <div className={'prose-lg flex-1'}>
        <div className={'bg-gradient-to-r from-[#003366] from-0% to-[#0099cc] to-100%'}>
          <div className='feature mx-auto max-w-xl'>
            <div className='feature-img'>
              <img src={jiuxing} alt={'九星命理'} />
            </div>
            <div className='feature-content'>
              <h2>九星命理</h2>
              <p>探索宇宙之秘，揭开命运之谜。</p>
              <p>
                我们的九星命理服务，融合古老风水智慧与现代精准计算，为您揭示九星运势与家居风水的奥秘。
              </p>
              <p>
                跟随周大师的指引，让一白、二黑、三碧等九星为您的生活导航，找到最和谐的居住环境，让好运与您同行。
              </p>
              <p>选择我们，让九星照亮您的未来之路。</p>
            </div>
          </div>
        </div>

        <div className='bg-gradient-to-r from-[#FF6699] from-0% to-[#ffcccc] to-100%'>
          <div className='feature mx-auto max-w-xl'>
            <div className='feature-img'>
              <img src={bazihehun} alt={'八字合婚'} />
            </div>
            <div className='feature-content'>
              <h2>八字合婚</h2>
              <p>缘起缘灭，皆有定数。</p>
              <p>
                我们的八字合婚服务，以传统八字学为基础，结合现代科技，为您和您的伴侣量身打造合婚分析。
              </p>
              <p>
                通过本命卦、年支同气、月令合等细致分析，我们为您揭示两人间的缘分深浅，婚姻吉凶。
              </p>
              <p>周大师用他的智慧和经验，为您的爱情保驾护航，让真爱之路更加顺畅。</p>
            </div>
          </div>
        </div>

        <div className='bg-gradient-to-r from-[#66CC33] from-0% to-[#99FF99] to-100%'>
          <div className='feature mx-auto max-w-xl'>
            <div className='feature-img'>
              <img src={bazicesuan} alt={'八字测算'} />
            </div>
            <div className='feature-content'>
              <h2>八字测算</h2>
              <p>生辰八字，命运之钥。</p>
              <p>我们的八字测算服务，深入挖掘您的出生信息，为您提供最准确的命理分析。</p>
              <p>
                从年柱到时柱，从干支到五行，周大师将为您揭开命运的层层迷雾，预测您的姻缘、财运、事业等关键信息。
              </p>
              <p>选择我们，让八字成为您把握未来的有力工具。</p>
            </div>
          </div>
        </div>

        <div className='bg-gradient-to-r from-[#9933FF] from-0% to-[#CCCCFF] to-100%'>
          <div className='feature mx-auto max-w-xl'>
            <div className='feature-img'>
              <img src={weilai} alt={'未来运势'} />
            </div>
            <div className='feature-content'>
              <h2>未来运势</h2>
              <p>未来可期，运势可测。</p>
              <p>我们的未来运势预测服务，结合流年流月神煞，为您提供详尽的年度运势分析。</p>
              <p>无论是财运、运程、姻缘，还是事业、学业、健康，周大师都将为您一一解读。</p>
              <p>让我们的服务成为您规划未来的指南针，助您把握每一个重要时刻。</p>
            </div>
          </div>
        </div>

        <div className='bg-gradient-to-r from-[#996633] from-0% to-[#CC9966] to-100%'>
          <div className='feature mx-auto max-w-xl'>
            <div className='feature-img'>
              <img src={chengu} alt={'称骨论命'} />
            </div>
            <div className='feature-content'>
              <h2>称骨论命</h2>
              <p>骨重命轻，命运自知。</p>
              <p>
                我们的称骨论命服务，传承唐朝大师袁天罡的智慧，通过精确计算您的骨重，为您揭示一生的命运走向。
              </p>
              <p>
                周大师凭借深厚的命理学识，将为您解读骨重背后的深层含义，助您洞悉人生，把握机遇。
              </p>
            </div>
          </div>
        </div>

        <div className='bg-gradient-to-r from-[#999999] from-0% to-[#CCCCCC] to-100%'>
          <div className='feature mx-auto max-w-xl'>
            <div className='feature-img'>
              <img src={jiemeng} alt={'周公解梦'} />
            </div>
            <div className='feature-content'>
              <h2>周公解梦</h2>
              <p>梦境迷离，周公解惑。</p>
              <p>我们的周公解梦服务，通过输入梦境关键字，为您提供精准的梦境释意。</p>
              <p>无论是吉梦还是凶梦，周大师都将为您揭示梦中的预兆，助您洞察内心，指引生活。</p>
              <p>让我们的服务成为您解读梦境的钥匙，开启心灵之门。</p>
            </div>
          </div>
        </div>

        <div className='bg-gradient-to-r from-[#FFCC00] from-0% to-[#FFFF99] to-100%'>
          <div className='feature mx-auto max-w-xl'>
            <div className='feature-img'>
              <img src={jiri} alt={'择吉日'} />
            </div>
            <div className='feature-content'>
              <h2>择吉日</h2>
              <p>吉日良辰，事半功倍。</p>
              <p>周大师的智慧之光，为您揭开时间的神秘面纱，捕捉那些璀璨的吉日星辰。</p>
              <p>
                无论是婚嫁、开业、搬家，还是生命中的每一个重要篇章，我们都将为您精心挑选，确保您在最佳时机扬帆起航，让好运与您同行。
              </p>
              <p>
                择吉日，择未来，择幸福。让神秘的星辰，为您指引前行的方向。让周大师的择吉日服务，成为您通往美好生活的金钥匙。
              </p>
            </div>
          </div>
        </div>

        <div className='bg-gradient-to-r from-[#FF6600] from-0% to-[#FF9966] to-100%'>
          <div className='feature mx-auto max-w-xl'>
            <div className='feature-img'>
              <img src={qiming} alt={'起名'} />
            </div>
            <div className='feature-content'>
              <h2>起名</h2>
              <p>星辰秘语，命运启明。</p>
              <p>
                周大师握81数理之秘钥，揭命运之迷雾。每一笔，皆宇宙之印记，每一名，皆星辰之对话。
              </p>
              <p>
                汲易学之精髓，化吉凶为护符，让您的名字，成为运势之秘钥。勿让命运随波逐流，81数理绘星图，启程驾驭神秘未来。
              </p>
              <p>周大师精通姓名学，为您铸响亮吉祥之名，助您步步登高，运势如虹。</p>
            </div>
          </div>
        </div>
      </div>
      <div className={'flex-shrink-0 flex-grow-0 border-t border-gray-300'}>
        <Footer />
      </div>
    </main>
  );
};

export default Home;
