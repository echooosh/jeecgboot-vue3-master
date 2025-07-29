<template>
  <div class="p-4">
    <div class="md:flex enter-y md:h-1/4">
      <!-- logo 卡片 -->
      <div class="md:w-1/4">
        <a-card class="!md:mr-4 !md:mt-0 !mt-4 custom" :body-style="{ width: '100%', position: 'relative' }" :bordered="false">
          <div class="title">海关关区</div>
          <div class="content">
            <img src="@/assets/images/logo.png" alt="" />
            <div style="display: flex; flex-direction: column; width: calc(100% - 64px)">
              <span class="lineup">{{ '中华人民共和国' + loginTenantName }}</span>
              <span class="linedown">{{ customsEnName }}</span>
            </div>
          </div>
          <img class="ad-img" src="@/assets/images/logo-back.png" alt="" />
        </a-card>
      </div>

      <!-- 其他卡片 -->
      <div v-for="(item, idx) in topCards" :key="idx" class="md:w-1/4" @click="clickToShift(item.title)">
        <a-card :class="item.class" :body-style="{ width: '100%', position: 'relative' }" :bordered="false">
          <div class="title">{{ item.title }}</div>
          <div class="content">
            <span class="number">
              {{ item.number }}
              <span style="font-size: 24px; margin-left: 4px">{{ item.unit }}</span>
            </span>
            <span class="desc">{{ item.desc }}</span>
          </div>

          <img class="ad-img" :src="item.url" alt="" />
        </a-card>
      </div>
    </div>
    <div class="md:flex enter-y md:h-3/4">
      <div class="md:w-1/4 md:flex md:flex-col w-full">
        <div v-for="(item, idx) in leftCards" :key="idx" class="md:h-1/3" @click="clickToShift(item.title)">
          <a-card
            class="!md:mr-4 !mt-4 quantity"
            style="height: calc(100% - 16px)"
            :body-style="{ width: '100%', position: 'relative' }"
            :bordered="false"
          >
            <div class="title">{{ item.title }}</div>
            <div class="content">
              <span class="number">
                {{ item.number }}
                <span style="font-size: 24px; margin-left: 4px">{{ item.unit }}</span>
              </span>
              <span class="desc">{{ item.desc }}</span>
            </div>
            <img class="ad-img" :src="item.url" alt="" />
          </a-card>
        </div>
      </div>
      <div class="md:w-3/4 w-full md:flex md:flex-col issueBox">
        <a-card
          class="!mt-4 quantity"
          style="height: calc(100% - 16px)"
          :body-style="{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }"
          :bordered="false"
        >
          <div style="display: flex; align-items: center; border-bottom: 1px solid #e8e8e8">
            <div class="title">通知公告</div>
            <!-- 时间查询暂时去掉 -->
            <!-- <div class="extra-wrapper">
              <div class="extra-item">
                <a>今日</a>
                <a>本周</a>
                <a>本月</a>
                <a>本年</a>
              </div>
              <a-range-picker :style="{ width: '256px' }" />
            </div> -->
          </div>
          <div
            class="content"
            style="width: 100%; height: calc(100% - 44px - 42px); overflow: auto; max-height: 840px"
            @click="clickToShift('通知公告')"
          >
            <Timeline v-if="timelineItems.length > 0">
              <TimelineItem v-for="(item, index) in timelineItems" :key="index" class="timeline-item">
                <div class="notice">{{ item.name + '-' + item.materialDesc }}</div>
                <div class="time">{{ item.createTime.slice(0, 10) }}</div>
              </TimelineItem>
            </Timeline>
            <span v-else style="display: flex; justify-content: center">暂无通知公告</span>
          </div>

          <div class="footer">
            <a-pagination
              v-model:current="pageNum"
              :defaultPageSize="pageSize"
              size="small"
              :pageSizeOptions="['20', '50', '100', '500']"
              :total="totalRecord"
              show-quick-jumper
              :show-total="(total) => `共 ${total} 条`"
              @change="onPageChange"
              show-size-changer
              @show-size-change="onPageSizeChange"
            />
          </div>
        </a-card>
      </div>
    </div>

    <!-- <ChartGroupCard class="enter-y" :loading="loading" type="chart" /> -->
    <!-- <SaleTabCard class="!my-4 enter-y" :loading="loading" /> -->
    <!-- <a-row>
      <a-col :span="24">
        <a-card :loading="loading" :bordered="false" title="最近一周访问量统计">
          <div class="infoArea">
            <HeadInfo title="今日IP" :iconColor="ipColor" :content="loginfo.todayIp" icon="environment" />
            <HeadInfo title="今日访问" :iconColor="visitColor" :content="loginfo.todayVisitCount" icon="team" />
            <HeadInfo title="总访问量" :iconColor="seriesColor" :content="loginfo.totalVisitCount" icon="rise" />
          </div>
          <LineMulti :chartData="lineMultiData" height="33vh" type="line" :option="{ legend: { top: 'bottom' } }" />
        </a-card>
      </a-col>
    </a-row> -->
  </div>
</template>
<script lang="ts" setup>
  import { ref, watch, computed } from 'vue';
  import { useRouter } from 'vue-router';
  import { message } from 'ant-design-vue';
  import { getLoginfo, getVisitInfo, getNoticeInfoApi, countAllApi } from '../api';
  import { useRootSetting } from '/@/hooks/setting/useRootSetting';
  import { getTenantId } from '/@/utils/auth';
  // import ChartGroupCard from '../components/ChartGroupCard.vue';
  // import SaleTabCard from '../components/SaleTabCard.vue';
  // import LineMulti from '/@/components/chart/LineMulti.vue';
  // import HeadInfo from '/@/components/chart/HeadInfo.vue';
  // import jeecgAdTextImg from '/@/assets/loginmini/icon/jeecg_ad_text.png';

  import menu12 from '@/assets/images/menu12.png';
  import menu13 from '@/assets/images/menu13.png';
  import menu14 from '@/assets/images/menu14.png';
  import menu21 from '@/assets/images/menu21.png';
  import menu31 from '@/assets/images/menu31.png';
  import menu41 from '@/assets/images/menu41.png';
  import { Timeline, TimelineItem } from 'ant-design-vue';
  import { Pagination } from 'ant-design-vue';
  import { getLoginTenantName, customsNameMap } from '/@/views/system/tenant/tenant.api';

  const onPageSizeChange = (current, size) => {
    pageSize.value = size;
    getNoticeInfo(current); // 重新加载数据
  };
  const onPageChange = (page, pageSize) => {
    pageSize.value = pageSize;
    pageNum.value = page;
    getNoticeInfo(); // 重新加载数据
  };
  const router = useRouter();
  const APagination = Pagination;
  const loading = ref(true);
  const { getThemeColor } = useRootSetting();
  interface LineMultiItem {
    name: string;
    type: string;
    value: number | string;
    color: string;
    materialDesc: string;
  }
  setTimeout(() => {
    loading.value = false;
  }, 500);
  const loginTenantName = ref<string>('');
  const loginfo = ref({});
  const lineMultiData = ref<LineMultiItem[]>([]);
  async function getTenantName() {
    loginTenantName.value = await getLoginTenantName();
  }
  const customsEnName = computed(() => {
    // 去掉“中华人民共和国”前缀
    const name = loginTenantName.value;
    return customsNameMap[name] || 'CUSTOMS DISTRICT P.R.CHINA';
  });
  const pageNum = ref(1);
  const pageSize = ref(20);
  const totalRecord = ref(100);
  interface TimeItem {
    name: string;
    createTime: string;
  }
  const timelineItems = ref<TimeItem[]>([]);
  function getNoticeInfo() {
    getNoticeInfoApi({
      tenantId: getTenantId() ? getTenantId().toString() : '0',
      pageNo: pageNum.value,
      pageSize: pageSize.value,
    }).then((res) => {
      if (res.success) {
        timelineItems.value = res.result.records;
        totalRecord.value = res.result.total;
      } else {
        message.error(res.message || '获取通知公告失败');
      }
    });
  }
  const mainListCount = ref({});

  function initLogInfo() {
    getLoginfo(null).then((res) => {
      if (res.success) {
        Object.keys(res.result).forEach((key) => {
          res.result[key] = res.result[key] + '';
        });
        loginfo.value = res.result;
      }
    });
    countAllApi(getTenantId() ? getTenantId().toString() : '0').then((res) => {
      if (res.success) {
        mainListCount.value = res.result;
        topCards.value[0].number = res.result['DTFWL'] ? res.result['DTFWL'] : 0;
        topCards.value[1].number = res.result['LSHG'] ? res.result['LSHG'] : 0;
        topCards.value[2].number = res.result['BSDT'] ? res.result['BSDT'] : 0;
        leftCards.value[0].number = res.result['SXFL'] ? res.result['SXFL'] : 0;
        leftCards.value[1].number = res.result['BSSX'] ? res.result['BSSX'] : 0;
        leftCards.value[2].number = res.result['JYJC  '] ? res.result['JYJC   '] : 0;
      } else {
        message.error(res.message || '获取统计信息失败，请稍后再试');
      }
    });
    getVisitInfo(null).then((res) => {
      if (res.success) {
        lineMultiData.value = [];
        res.result.forEach((item) => {
          lineMultiData.value.push({ name: item.type, type: 'ip', value: item.ip, color: ipColor.value });
          lineMultiData.value.push({ name: item.type, type: 'visit', value: item.visit, color: visitColor.value });
        });
      }
    });
    getNoticeInfo();
    getTenantName();
  }

  const ipColor = ref();
  const visitColor = ref();
  const seriesColor = ref();
  watch(
    () => getThemeColor.value,
    () => {
      seriesColor.value = getThemeColor.value;
      visitColor.value = '#67B962';
      ipColor.value = getThemeColor.value;
      initLogInfo();
    },
    { immediate: true }
  );

  // function getRandomColor() {
  //   var letters = '0123456789ABCDEF';
  //   var color = '#';
  //   for (var i = 0; i < 6; i++) {
  //     color += letters[Math.floor(Math.random() * 16)];
  //   }
  //   return color;
  // }
  // 卡片列表初始化
  const topCards = ref([
    {
      title: '地图访问量',
      number: 0,
      unit: '次',
      desc: '累计访问量',
      class: '!md:mr-4 !md:mt-0 !mt-4 quantity',
      url: menu12,
    },
    {
      title: '海关数量',
      number: 0,
      unit: '个',
      desc: '总数量',
      class: '!md:mr-4 !md:mt-0 !mt-4 quantity',
      url: menu13,
    },
    {
      title: '办事大厅数量',
      number: 0,
      unit: '个',
      desc: '总数量',
      class: '!md:mt-0 !mt-4 quantity',
      url: menu14,
    },
  ]);
  const leftCards = ref([
    {
      title: '事项分类数量',
      number: 0,
      unit: '个',
      desc: '总数量',
      url: menu21,
    },
    {
      title: '办事事项',
      number: 0,
      unit: '个',
      desc: '总数量',
      url: menu31,
    },
    {
      title: '纠错信息数量',
      number: 0,
      unit: '个',
      desc: '总数量',
      url: menu41,
    },
  ]);
  function clickToShift(title: string) {
    switch (title) {
      case '海关数量':
        router.push('/govmap/org/appOrgList');
        break;
      case '办事大厅数量':
        router.push('/govmap/hall/appHallList');
        break;
      case '事项分类数量':
        router.push('/govmap/cate/appCateList');
        break;
      case '办事事项':
        router.push('/govmap/item/appItemList');
        break;
      case '纠错信息数量':
        router.push('/online/cgformList/8460cef190ea4e4a997bb854d09222e6');
        break;
      case '通知公告':
        router.push('/govmap/notice/appRelatedNoticeList');
        break;
      default:
        // 地图访问量 或其他不跳转项
        break;
    }
  }
</script>

<style lang="less" scoped>
  .infoArea {
    display: flex;
    justify-content: space-between;
    padding: 0 10%;
    .head-info.center {
      padding: 0;
    }
    .head-info {
      min-width: 0;
    }
  }
  .circle-cust {
    position: relative;
    top: 28px;
    left: -100%;
  }

  .extra-wrapper {
    line-height: 55px;
    padding-right: 24px;

    .extra-item {
      display: inline-block;
      margin-right: 24px;

      a {
        margin-left: 24px;
      }
    }
  }

  /* 首页访问量统计 */
  .head-info {
    position: relative;
    text-align: left;
    padding: 0 32px 0 0;
    min-width: 125px;

    &.center {
      text-align: center;
      padding: 0 32px;
    }

    span {
      color: rgba(0, 0, 0, 0.45);
      display: inline-block;
      font-size: 0.95rem;
      line-height: 42px;
      margin-bottom: 4px;
    }

    p {
      line-height: 42px;
      margin: 0;

      a {
        font-weight: 600;
        font-size: 1rem;
      }
    }
  }
  .ant-card {
    ::v-deep(.ant-card-head-title) {
      font-weight: normal;
    }
  }

  // 布局修改
  .issueBox {
    .extra-wrapper {
      line-height: 55px;
      padding-right: 24px;
      margin-left: auto;

      .extra-item {
        display: inline-block;
        margin-right: 24px;

        a {
          margin-left: 24px;
        }
      }
    }
    .ant-timeline {
      margin-top: 7px;
    }
    .ant-timeline .ant-timeline-item-last > .ant-timeline-item-content {
      padding-bottom: 0;
    }
    .timeline-item {
      display: flex;
      flex-direction: row;

      :deep(.ant-timeline-item-content) {
        display: flex;
        width: calc(100% - 26px);
        .time {
          margin-left: auto;
          width: 80px;
        }
        .notice {
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin-right: 16px;
        }
      }
    }
    .footer {
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .custom {
    background: #1b53ae;
    border-radius: 8px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;

    .title {
      color: white;
      font-size: 24px;
    }
    .content {
      color: white;
      display: flex;
      margin: 30px 0;
      font-weight: 800;
      z-index: 5;
      position: relative;

      .lineup {
        color: white;
        font-size: 28px;

        margin-left: 8px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-family: 'SimSun', '宋体', serif;
      }
      .linedown {
        margin-left: 8px;
        font-size: 11px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .ad-img {
      position: absolute;
      right: 0;
      top: 0;
      height: 100%;
      object-fit: contain;
      z-index: 1;
      opacity: 0.06;
    }
  }

  .quantity {
    border-radius: 8px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    cursor: pointer;

    &::after {
      position: absolute;
      inset: 0;
      pointer-events: none;
      content: '';
      background-color: #c3e7fe;
      opacity: 0; /* 默认不显示 */
      transition: opacity 0.3s; /* 添加过渡效果 */
    }
    &:hover {
      box-shadow: inset 0 0 0 1px #c3e7fe;
      .title {
        color: #1b53ae;
      }

      &::after {
        opacity: 0.5;
      }
    }

    .title {
      font-size: 24px;
      z-index: 5;
      position: relative;
    }
    .content {
      display: flex;
      width: 100%;
      height: 100%;
      flex-direction: column;
      margin: 21px 0;
      z-index: 5;
      position: relative;

      .number {
        color: #608deb;
        font-size: 36px;
        line-height: 56px;
      }
      .desc {
        font-size: 14px;
        color: #666666;
      }
    }
    .ad-img {
      position: absolute;
      right: 24px;
      top: 10%;
      height: 80%;
      object-fit: contain;
      z-index: 1;
    }
  }
</style>
