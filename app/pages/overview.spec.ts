import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { mount, flushPromises, VueWrapper } from '@vue/test-utils';
import type { ComponentPublicInstance } from 'vue';
import Overview from './overview.vue'; // Adjust path to your overview.vue file
import type { LESSONS_RESPONSE } from '../type'; // Adjust path as needed

// Type definition for the component instance
interface OverviewComponent extends ComponentPublicInstance {
  data: LESSONS_RESPONSE | null;
  view: number;
  fterm: string;
  lessonlayout: string;
  filteredLessons: any[];
  numtopics: number;
  numlesson: number;
  numexchanges: number;
}

// Mock the child components
const SidebarStub = {
  name: 'Sidebar',
  template: '<aside>Sidebar</aside>'
};

const LessonStub = {
  name: 'Lesson',
  template: '<div class="lesson">{{ lesson.Name }}</div>',
  props: ['lesson']
};

const FontAwesomeStub = {
  name: 'FontAwesome',
  template: '<span></span>',
  props: ['icon']
};

// Mock lessons data
const mockLessonsData = {
  search: {
    lessons: {
      result: {
        results: [
                    {
                        "Yotposcore": 0,
                        "Lessonid": "",
                        "Access": "",
                        "Code": "",
                        "Parentid": "",
                        "Channel": "",
                        "Curriculum": "",
                        "Cid": 2959,
                        "Styles": "",
                        "Releasedate": "2025-12-05",
                        "Popularity": 0,
                        "Educator": "Ariel Posen",
                        "Price": 0,
                        "Image": "https:\/\/d2xkd1fof6iiv9.cloudfront.net\/segments\/v98253@2x.jpg",
                        "Description": "",
                        "Tftv": "",
                        "Name": "Back to Basics: Triads<br \/><small>Course Wrap-Up & Next Steps<\/small>",
                        "Url": "",
                        "Sku": "TFITEMV-98253",
                        "Ct": "Back to Basics: Triads (Pre-Order)",
                        "Authorid": "",
                        "Subtitle": "",
                        "Instrument": "",
                        "Series": "",
                        "Skilllevel": "",
                        "Sid": 98253,
                        "Img": "",
                        "Yotpocount": 0,
                        "Status": "",
                        "id": 98253,
                        "results_flags": "",
                        "early_access_date": false,
                        "yotpo": {
                            "reviews": 0,
                            "score": 0
                        },
                        "Type": "lesson",
                        "song": 0,
                        "objectID": "truefire-lessons-98253"
                    },
                    {
                        "Yotposcore": 0,
                        "Lessonid": "",
                        "Access": "",
                        "Code": "",
                        "Parentid": "",
                        "Channel": "",
                        "Curriculum": "",
                        "Cid": 2959,
                        "Styles": "",
                        "Releasedate": "2025-12-05",
                        "Popularity": 0,
                        "Educator": "Ariel Posen",
                        "Price": 0,
                        "Image": "https:\/\/d2xkd1fof6iiv9.cloudfront.net\/segments\/v98252@2x.jpg",
                        "Description": "",
                        "Tftv": "",
                        "Name": "Metro \"B\" Section with Mixed Triads<br \/><small>Lesson & Demo<\/small>",
                        "Url": "",
                        "Sku": "TFITEMV-98252",
                        "Ct": "Back to Basics: Triads (Pre-Order)",
                        "Authorid": "",
                        "Subtitle": "",
                        "Instrument": "",
                        "Series": "",
                        "Skilllevel": "",
                        "Sid": 98252,
                        "Img": "",
                        "Yotpocount": 0,
                        "Status": "",
                        "id": 98252,
                        "results_flags": "",
                        "early_access_date": false,
                        "yotpo": {
                            "reviews": 0,
                            "score": 0
                        },
                        "Type": "lesson",
                        "song": 0,
                        "objectID": "truefire-lessons-98252"
                    },
                    {
                        "Yotposcore": 0,
                        "Lessonid": "",
                        "Access": "",
                        "Code": "",
                        "Parentid": "",
                        "Channel": "",
                        "Curriculum": "",
                        "Cid": 2959,
                        "Styles": "",
                        "Releasedate": "2025-12-05",
                        "Popularity": 0,
                        "Educator": "Ariel Posen",
                        "Price": 0,
                        "Image": "https:\/\/d2xkd1fof6iiv9.cloudfront.net\/segments\/v98251@2x.jpg",
                        "Description": "",
                        "Tftv": "",
                        "Name": "Metro \"A\" Section with Mixed Triads<br \/><small>Lesson & Demo<\/small>",
                        "Url": "",
                        "Sku": "TFITEMV-98251",
                        "Ct": "Back to Basics: Triads (Pre-Order)",
                        "Authorid": "",
                        "Subtitle": "",
                        "Instrument": "",
                        "Series": "",
                        "Skilllevel": "",
                        "Sid": 98251,
                        "Img": "",
                        "Yotpocount": 0,
                        "Status": "",
                        "id": 98251,
                        "results_flags": "",
                        "early_access_date": false,
                        "yotpo": {
                            "reviews": 0,
                            "score": 0
                        },
                        "Type": "lesson",
                        "song": 0,
                        "objectID": "truefire-lessons-98251"
                    }
        ]
      }
    }
  }
};

describe('Overview Component', () => {
  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    // Create a mock for fetch
    fetchMock = vi.fn();
    globalThis.fetch = fetchMock;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const createWrapper = () => {
    return mount(Overview, {
      global: {
        stubs: {
          Sidebar: SidebarStub,
          Lesson: LessonStub,
          FontAwesome: FontAwesomeStub
        }
      }
    }) as VueWrapper<OverviewComponent>;
  };

  describe('Data Fetching', () => {
    it('should fetch lessons data on mount', async () => {
      fetchMock.mockResolvedValueOnce({
        json: async () => mockLessonsData
      } as Response);

      const wrapper = createWrapper();
      await flushPromises();

      expect(fetchMock).toHaveBeenCalledWith('/lessons.json');
    });

    it('should handle fetch errors gracefully', async () => {
      const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
      fetchMock.mockRejectedValueOnce(new Error('Network error'));

      createWrapper();
      await flushPromises();

      expect(consoleLogSpy).toHaveBeenCalledWith('error', expect.any(Error));
      consoleLogSpy.mockRestore();
    });

    it('should populate data after successful fetch', async () => {
      fetchMock.mockResolvedValueOnce({
        json: async () => mockLessonsData
      } as Response);

      const wrapper = createWrapper();
      await flushPromises();

      expect(wrapper.vm.data).toEqual(mockLessonsData);
    });
  });

  describe('Filtering', () => {
    it('should display all lessons when no filter is applied', async () => {
      fetchMock.mockResolvedValueOnce({
        json: async () => mockLessonsData
      } as Response);

      const wrapper = createWrapper();
      await flushPromises();

      expect(wrapper.vm.filteredLessons).toHaveLength(3);
    });

    it('should filter lessons based on search term', async () => {
      fetchMock.mockResolvedValueOnce({
        json: async () => mockLessonsData
      } as Response);

      const wrapper = createWrapper();
      await flushPromises();

      const searchInput = wrapper.find('input[type="search"]');
      await searchInput.setValue('Metro');

      expect(wrapper.vm.filteredLessons).toHaveLength(2);
    });

    it('should be case-insensitive when filtering', async () => {
      fetchMock.mockResolvedValueOnce({
        json: async () => mockLessonsData
      } as Response);

      const wrapper = createWrapper();
      await flushPromises();

      await wrapper.find('input[type="search"]').setValue('BACK');

      expect(wrapper.vm.filteredLessons).toHaveLength(1);
    });

    it('should return empty array when data is null', () => {
      fetchMock.mockImplementation(() => new Promise(() => {})); // Never resolves
      
      const wrapper = createWrapper();
      expect(wrapper.vm.filteredLessons).toEqual([]);
    });

    it('should show "No lessons match" message when filter returns no results', async () => {
      fetchMock.mockResolvedValueOnce({
        json: async () => mockLessonsData
      } as Response);

      const wrapper = createWrapper();
      await flushPromises();

      await wrapper.find('input[type="search"]').setValue('nonexistent');

      expect(wrapper.text()).toContain('No lessons match that filter');
    });
  });

  describe('View Toggle', () => {
    it('should default to view 1', () => {
      const wrapper = createWrapper();
      expect(wrapper.vm.view).toBe(1);
    });

    it('should update layout class when view changes', async () => {
      fetchMock.mockResolvedValueOnce({
        json: async () => mockLessonsData
      } as Response);

      const wrapper = createWrapper();
      await flushPromises();

      const lessonsList = wrapper.find('#lessons-list');
      expect(lessonsList.classes()).toContain('view-1');

      const view2Radio = wrapper.find('#view-2');
      await view2Radio.setValue(true);

      expect(lessonsList.classes()).toContain('view-2');
      expect(wrapper.vm.view).toBe(2);
    });

    it('should support all three view options', async () => {
      const wrapper = createWrapper();

      await wrapper.find('#view-1').setValue(true);
      expect(wrapper.vm.lessonlayout).toBe('view-1');

      await wrapper.find('#view-2').setValue(true);
      expect(wrapper.vm.lessonlayout).toBe('view-2');

      await wrapper.find('#view-3').setValue(true);
      expect(wrapper.vm.lessonlayout).toBe('view-3');
    });
  });

  describe('Rendering', () => {
    it('should render the correct number of lesson components', async () => {
      fetchMock.mockResolvedValueOnce({
        json: async () => mockLessonsData
      } as Response);

      const wrapper = createWrapper();
      await flushPromises();

      const lessons = wrapper.findAll('.lesson');
      expect(lessons).toHaveLength(3);
    });

    it('should display result summary with correct stats', () => {
      const wrapper = createWrapper();
      const summary = wrapper.find('#result-summary');

      expect(summary.text()).toContain('64 Topics');
      expect(summary.text()).toContain('284 Lesson Videos');
      expect(summary.text()).toContain('1673 Video Exchanges');
    });

    it('should render sidebar component', () => {
      const wrapper = createWrapper();
      expect(wrapper.find('aside').exists()).toBe(true);
    });

    it('should render search input with correct attributes', () => {
      const wrapper = createWrapper();
      const searchInput = wrapper.find('input[type="search"]');

      expect(searchInput.exists()).toBe(true);
      expect(searchInput.attributes('placeholder')).toBe('search');
      expect(searchInput.attributes('aria-label')).toBe('search');
    });

    it('should render all three view radio buttons', () => {
      const wrapper = createWrapper();
      
      expect(wrapper.find('#view-1').exists()).toBe(true);
      expect(wrapper.find('#view-2').exists()).toBe(true);
      expect(wrapper.find('#view-3').exists()).toBe(true);
    });
  });

  describe('Computed Properties', () => {
    it('lessonlayout should reflect current view', async () => {
      const wrapper = createWrapper();

      wrapper.vm.view = 1;
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.lessonlayout).toBe('view-1');

      wrapper.vm.view = 2;
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.lessonlayout).toBe('view-2');

      wrapper.vm.view = 3;
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.lessonlayout).toBe('view-3');
    });

    it('filteredLessons should be reactive to fterm changes', async () => {
      fetchMock.mockResolvedValueOnce({
        json: async () => mockLessonsData
      } as Response);

      const wrapper = createWrapper();
      await flushPromises();

      wrapper.vm.fterm = '';
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.filteredLessons).toHaveLength(3);

      wrapper.vm.fterm = 'french';
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.filteredLessons).toHaveLength(0);
    });
  });
});