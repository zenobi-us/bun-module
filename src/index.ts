import { Plugin, tool } from '@opencode-ai/plugin';
import { BackgroundProcessManager } from './BackgroundProcessManager';

const backgroundTaskManager = new BackgroundProcessManager();

export const BackgroundProcesssPlugin: Plugin = async () => {
  const createBackgroundProcess = tool({
    description:
      'Run a command as a background task with real-time output tracking, session tracking, optional tags, and global flag',
    args: {
      command: tool.schema.string(),
      name: tool.schema.string().optional(),
      tags: tool.schema.array(tool.schema.string()).optional(),
      global: tool.schema.boolean().optional(),
    },
    async execute(args, ctx) {
      return backgroundTaskManager.createTask({
        command: args.command,
        name: args.name,
        tags: args.tags,
        global: args.global,
        sessionId: ctx.sessionID,
      });
    },
  });

  const getBackgroundProcess = tool({
    description: 'Retrieve details and output of a specific background task',
    args: {
      taskId: tool.schema.string(),
    },
    async execute(args) {
      return backgroundTaskManager.getTask(args.taskId);
    },
  });

  const listBackgroundProcesss = tool({
    description: 'List background tasks with advanced filtering options',
    args: {
      sessionId: tool.schema.string().optional(),
      status: tool.schema.string().optional(),
      tags: tool.schema.array(tool.schema.string()).optional(),
    },
    async execute(args) {
      return backgroundTaskManager.listTasks({
        sessionId: args.sessionId,
        status: args.status,
        tags: args.tags,
      });
    },
  });

  const killTasks = tool({
    description: 'Kill background tasks with advanced filtering options',
    args: {
      taskId: tool.schema.string().optional(),
      sessionId: tool.schema.string().optional(),
      status: tool.schema.string().optional(),
      tags: tool.schema.array(tool.schema.string()).optional(),
    },
    async execute(args) {
      return backgroundTaskManager.killTasks({
        taskId: args.taskId,
        sessionId: args.sessionId,
        status: args.status,
        tags: args.tags || [],
      });
    },
  });

  return {
    tool: {
      createBackgroundProcess,
      getBackgroundProcess,
      listBackgroundProcesss,
      killTasks,
    },

    event: async (eventContext) => {
      if (!eventContext.event) {
        return;
      }
      const sessionId =
        eventContext.event.type === 'session.deleted'
          ? eventContext.event.properties.info.parentID
          : null;

      if (eventContext.event.type === 'session.deleted' && !!sessionId) {
        backgroundTaskManager.cleanupSessionTasks(sessionId);
      }

      // backgroundTaskManager.clearAllTasks();
    },
  };
};
