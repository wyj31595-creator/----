
import { CardContent } from './types';

export const CARD_DATA: CardContent[] = [
  {
    id: 1,
    title: "우리의 평범한 일상이\n특별한 기적이 됩니다",
    subtitle: "사회적협동조합 공존 5주년",
    description: [
      "새로운 한 해, 공존과 함께해주셔서 감사합니다.",
      "지난 한 해의 격동을 뒤로하고,",
      "여러분의 건강과 행복을 진심으로 기원합니다."
    ],
    imageUrl: "https://images.unsplash.com/photo-1571168128362-e6e746777651?auto=format&fit=crop&q=80&w=1200",
    highlightText: "함께라서 더 따뜻한 동행"
  },
  {
    id: 2,
    title: "설립 5년, 그동안 쌓아온\n소중한 일상의 경험들",
    description: [
      "발달장애인들이 비장애인의 삶 속에서",
      "함께 공존하는 삶을 준비할 수 있도록,",
      "다양한 프로그램을 통해 일상을 축적해왔습니다."
    ],
    imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=1200",
    highlightText: "벌써 5년째 이어지는 사랑"
  },
  {
    id: 3,
    title: "형제 자매의 힘겨운 돌봄,\n이제 우리가 나설 때입니다",
    description: [
      "보호자의 고령화와 부재로 인해",
      "남겨진 가족들의 어깨가 무거워지고 있습니다.",
      "독립적인 삶을 위한 공동주택(그룹홈) 운영이 시급합니다."
    ],
    imageUrl: "https://images.unsplash.com/photo-1516307364728-25b36c5f400b?auto=format&fit=crop&q=80&w=1200",
    highlightText: "지속가능한 자립을 향한 꿈"
  },
  {
    id: 4,
    title: "공존의 울타리가\n되어주시겠어요?",
    description: [
      "공존이 멈추지 않고 운영되기 위해서는",
      "여러분의 정기적인 따뜻한 손길이 필요합니다.",
      "작은 나눔이 모여 커다란 울타리가 됩니다."
    ],
    imageUrl: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=1200",
    highlightText: "월 1~2만원의 기적"
  },
  {
    id: 5,
    title: "지금, 당신의 사랑을\n전달해주세요",
    description: [
      "매달 커피 몇 잔의 금액으로",
      "발달장애인의 내일을 바꿀 수 있습니다.",
      "연말정산 시 세제 혜택도 함께 누리세요."
    ],
    imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=1200",
    highlightText: "연말정산 세제혜택 가능",
    isActionCard: false
  }
];

/**
 * 센터에서 사용하시는 해피빈 후원신청서 주소입니다.
 * 주소를 바꾸면 앱 하단의 [우리의 울타리 되어주기] 버튼이 이 주소로 연결됩니다.
 */
export const EXTERNAL_DONATION_URL = "https://www.ihappynanum.com/Nanum/B/KV58E5SU28";
